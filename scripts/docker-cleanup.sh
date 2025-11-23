#!/bin/bash

# Portfolio Docker 리소스 정리 스크립트
# 공통 유틸리티 함수 로드
source "$(dirname "${BASH_SOURCE[0]}")/common.sh"

# 스크립트 설정
setup_script

log_info "🧹 Portfolio Docker 리소스 정리 시작..."

# 현재 실행 중인 Portfolio 관련 컨테이너 확인
log_info "📋 현재 실행 중인 Portfolio 관련 컨테이너:"
docker ps -a --filter "name=portfolio" --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"

echo ""
if confirm_action "⚠️  모든 Portfolio 관련 컨테이너, 이미지, 볼륨을 삭제하시겠습니까?"; then
    :  # 계속 진행
else
    log_info "작업이 취소되었습니다."
    exit 0
fi

echo ""
log_info "🛑 컨테이너 중지 및 삭제 중..."

# Docker 정리 실행
docker_cleanup_portfolio

log_info "✅ 정리 완료!"
echo ""
log_info "📊 정리된 리소스:"
echo "  - Portfolio 관련 컨테이너: 삭제됨"
echo "  - Portfolio 관련 이미지: 삭제됨"
echo "  - Portfolio 관련 볼륨: 삭제됨"
echo "  - 사용하지 않는 Docker 리소스: 정리됨"
echo ""
log_info "🚀 이제 './scripts/docker-build.sh' 스크립트를 실행하여 재빌드하세요!"
