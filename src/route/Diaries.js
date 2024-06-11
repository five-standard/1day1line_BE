const _ = require("../controllers/Diaries");
const router = require("express")();

// 일기 쓰기, 일기 목록 불러오기 (달별), 일기 상세 불러오기, 일기 대표글 변경하기
router.post("/write", _.writeDiary);
router.get("/list", _.listDiary);
router.get("/detail", _.detailDiary);
router.patch("/top", _.setTopDiary);
router.get("/search", _.searchDiary);

module.exports = router;

// 텍스트로 검색하기 (전체 날짜) 정도
// 프론트는 세세한 뷰 수정, 다크모드 추가 (설정아이콘 위치에 다크모드 아이콘) 정도
