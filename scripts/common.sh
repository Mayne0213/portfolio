#!/bin/bash

# Portfolio 스크립트 공통 유틸리티 함수들
# 모든 Portfolio 스크립트에서 사용할 수 있는 공통 기능들을 정의

set -e
# shopt -s inherit_errexit

# 공통 스크립트의 절대 경로 기반 디렉토리 상수
# 함수 호출 컨텍스트에 따라 BASH_SOURCE 해석이 달라질 수 있으므로
# 로드 시점에 고정해 신뢰 가능한 루트를 계산한다
PORTFOLIO_SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORTFOLIO_ROOT="$(dirname "${PORTFOLIO_SCRIPTS_DIR}")"

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로깅 함수들
log_info() {
    echo -e "${GREEN}[INFO]${NC} ${1}"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} ${1}"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} ${1}"
}

log_debug() {
    echo -e "${BLUE}[DEBUG]${NC} ${1}"
}

# 경로 계산 함수
get_portfolio_root() {
    # 로드 시점에 고정된 루트 경로 반환
    echo "${PORTFOLIO_ROOT}"
}

get_mayne_root() {
    # portfolio 루트를 기준으로 mayne 루트 경로 계산
    local portfolio_root
    portfolio_root="$(get_portfolio_root)"
    dirname "$(dirname "${portfolio_root}")"
}

# 확인 함수
confirm_action() {
    local message="${1}"
    local default="${2:-N}"

    if [[ "${default}" == "Y" ]]; then
        read -p "${message} (Y/n): " -n 1 -r
        echo
        if [[ ${REPLY} =~ ^[Nn]$ ]]; then
            return 1
        fi
        return 0
    else
        read -p "${message} (y/N): " -n 1 -r
        echo
        if [[ ${REPLY} =~ ^[Yy]$ ]]; then
            return 0
        fi
        return 1
    fi
}

# 필수 디렉토리 확인
check_required_dirs() {
    local portfolio_root
    portfolio_root="$(get_portfolio_root)"
    local dirs=("${@}")

    for dir in "${dirs[@]}"; do
        if [[ ! -d "${portfolio_root}/${dir}" ]]; then
            log_error "필수 디렉토리가 없습니다: ${dir}"
            exit 1
        fi
    done
}

# 필수 파일 확인
check_required_files() {
    local portfolio_root
    portfolio_root="$(get_portfolio_root)"
    local files=("${@}")

    for file in "${files[@]}"; do
        if [[ ! -f "${portfolio_root}/${file}" ]]; then
            log_error "필수 파일이 없습니다: ${file}"
            exit 1
        fi
    done
}

# Docker 관련 유틸리티
docker_cleanup_portfolio() {
    log_info "Portfolio 관련 Docker 리소스 정리 중..."

    # 컨테이너 중지 및 삭제
    docker-compose -p portfolio -f deploy/docker/docker-compose.yml down --remove-orphans 2>/dev/null || true
    docker-compose -p portfolio -f deploy/docker/docker-compose.dev.yml down --remove-orphans 2>/dev/null || true
    docker ps -aq --filter "name=portfolio" | xargs -r docker rm -f 2>/dev/null || true

    # 이미지 삭제
    docker images --filter "reference=portfolio*" -q | xargs -r docker rmi -f 2>/dev/null || true
    docker images --filter "reference=*portfolio*" -q | xargs -r docker rmi -f 2>/dev/null || true

    # 볼륨 삭제
    docker volume ls -q --filter "name=portfolio" | xargs -r docker volume rm -f 2>/dev/null || true

    # 시스템 정리
    docker system prune -f

    log_info "Docker 리소스 정리 완료"
}

# 환경 변수 로드
load_env_file() {
    local portfolio_root
    portfolio_root="$(get_portfolio_root)"
    local env_file="${portfolio_root}/.env"

    if [[ -f "${env_file}" ]]; then
        log_info "환경 변수 파일 로드: ${env_file}"
        # shellcheck source=/dev/null
        source "${env_file}"
        return 0
    else
        log_warn "환경 변수 파일이 없습니다: ${env_file}"
        return 1
    fi
}

# 에러 처리
handle_error() {
    local exit_code=$?
    log_error "스크립트 실행 중 오류가 발생했습니다 (종료 코드: ${exit_code})"
    exit "${exit_code}"
}

# 스크립트 시작 시 공통 설정
setup_script() {
    # 에러 발생 시 자동으로 handle_error 함수 호출
    trap handle_error ERR

    # 스크립트 디렉토리로 이동
    local portfolio_root
    portfolio_root="$(get_portfolio_root)"
    cd "${portfolio_root}"

    log_info "스크립트 시작: $(basename "${BASH_SOURCE[1]}")"
}

# 스크립트 종료 시 정리
cleanup_script() {
    local exit_code=$?
    if [[ "${exit_code}" -eq 0 ]]; then
        log_info "스크립트 완료: $(basename "${BASH_SOURCE[1]}")"
    else
        log_error "스크립트 실패: $(basename "${BASH_SOURCE[1]}") (종료 코드: ${exit_code})"
    fi
    exit "${exit_code}"
}

# 스크립트 종료 시 정리 함수 등록
trap cleanup_script EXIT
