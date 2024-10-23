export default function IconPreview() {
    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">아이콘 미리보기</h2>
            <div className="grid grid-cols-3 gap-4">
                {/* 여기에 생성된 아이콘 미리보기를 추가할 수 있습니다 */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
}