export default function Navbar() {

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-xl font-bold text-green-600">CanvasCraft</a>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <a href="/" className="text-gray-700 hover:text-green-600">AI Image Generator</a>
                        <a href="/editor" className="text-gray-700 hover:text-green-600">Tools</a>
                        <a href="/about" className="text-gray-700 hover:text-green-600">Image Editor</a>
                        <a href="/contact" className="text-gray-700 hover:text-green-600">About</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}