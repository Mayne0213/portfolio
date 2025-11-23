#!/bin/bash

# Portfolio Docker 빌드 및 실행 스크립트
# 공통 유틸리티 함수 로드
source "$(dirname "${BASH_SOURCE[0]}")/common.sh"

# 스크립트 설정
setup_script

log_info "🚀 Portfolio Docker 빌드 및 실행 시작..."

# 필수 디렉토리 및 파일 확인
log_info "📁 폴더 구조 확인 중..."
check_required_dirs "services/nextjs" "deploy/docker"

log_info "📄 필수 파일 확인 중..."
check_required_files "deploy/docker/docker-compose.yml" "deploy/docker/docker-compose.dev.yml" "deploy/docker/Dockerfile.prod" "deploy/docker/Dockerfile.dev"

log_info "✅ 폴더 구조 및 필수 파일 확인 완료!"

# 환경 선택
echo ""
log_info "🎯 실행할 환경을 선택하세요:"
echo "1) 개발 환경 (Development)"
echo "2) 프로덕션 환경 (Production)"
echo "3) 빌드만 (Build Only)"
read -p "선택 (1-3): " -n 1 -r
echo

case ${REPLY} in
    1)
        log_info "🔧 개발 환경 빌드 및 실행 중..."
        cd deploy/docker
        docker-compose -p portfolio -f docker-compose.dev.yml build --no-cache
        docker-compose -p portfolio -f docker-compose.dev.yml up -d
        PORTFOLIO_ROOT=$(get_portfolio_root)
        cd "${PORTFOLIO_ROOT}"
        ENV_TYPE="development"
        COMPOSE_FILE_PATH="deploy/docker/docker-compose.dev.yml"
        ;;
    2)
        log_info "🏭 프로덕션 환경 빌드 및 실행 중..."
        cd deploy/docker
        docker-compose -p portfolio -f docker-compose.yml build --no-cache
        docker-compose -p portfolio -f docker-compose.yml up -d
        PORTFOLIO_ROOT=$(get_portfolio_root)
        cd "${PORTFOLIO_ROOT}"
        ENV_TYPE="production"
        COMPOSE_FILE_PATH="deploy/docker/docker-compose.yml"
        ;;
    3)
        log_info "🔨 이미지 빌드만 실행 중..."
        cd deploy/docker
        log_info "  - 개발 이미지 빌드 중..."
        docker-compose -p portfolio -f docker-compose.dev.yml build --no-cache
        log_info "  - 프로덕션 이미지 빌드 중..."
        docker-compose -p portfolio -f docker-compose.yml build --no-cache
        PORTFOLIO_ROOT=$(get_portfolio_root)
        cd "${PORTFOLIO_ROOT}"
        log_info "✅ 빌드 완료! 실행하려면 다시 이 스크립트를 실행하고 환경을 선택하세요."
        exit 0
        ;;
    *)
        log_error "잘못된 선택입니다."
        exit 1
        ;;
esac

# 서비스 상태 확인
echo ""
log_info "⏳ 서비스 시작 대기 중..."
sleep 10

echo ""
log_info "📊 서비스 상태 확인:"
docker-compose -p portfolio -f "${COMPOSE_FILE_PATH}" ps

echo ""
log_info "🔍 컨테이너 로그 확인:"
echo "  - 애플리케이션 로그: docker-compose -p portfolio -f ${COMPOSE_FILE_PATH} logs -f app"

echo ""
log_info "🌐 접속 URL:"
echo "  - 애플리케이션: http://localhost:3005"

echo ""
log_info "✅ Docker 빌드 및 실행 완료!"
echo ""
log_info "📋 유용한 명령어:"
echo "  - 서비스 중지: docker-compose -p portfolio -f ${COMPOSE_FILE_PATH} down"
echo "  - 로그 확인: docker-compose -p portfolio -f ${COMPOSE_FILE_PATH} logs -f"
echo "  - 서비스 재시작: docker-compose -p portfolio -f ${COMPOSE_FILE_PATH} restart"
echo ""
