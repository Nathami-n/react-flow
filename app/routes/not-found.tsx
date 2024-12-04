
export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4"> 404</h1>
                <h2 className="text-2xl font-semibold mb-4">page not found</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Even the best information can be lost over the internet
                </p>
            </div>
        </div>)
}