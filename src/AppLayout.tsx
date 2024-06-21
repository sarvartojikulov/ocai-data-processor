import { PropsWithChildren } from "react";


function AppLayout({ children }: PropsWithChildren) {
    return (
        <main className="min-h-screen h-auto py-12">
            <div className="container mx-auto min-h-screen h-full flex flex-col justify-start gap-12">
                {children}
            </div>
        </main>
    );
}

export default AppLayout;
