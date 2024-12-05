import { Link } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";

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

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to={"/dashboard"} className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
            </div>
            <footer className="mt-12 text-center text-sm text-muted-foreground">
                If in doubt, please contact the support team for help
            </footer>
        </div>)
}