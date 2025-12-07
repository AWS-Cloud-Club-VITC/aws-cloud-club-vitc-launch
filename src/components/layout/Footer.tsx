export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} AWS CLOUD CLUB VIT-C. All rights reserved.</p>
            </div>
        </footer>
    );
}
