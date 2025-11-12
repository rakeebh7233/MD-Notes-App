import { Suspense } from "react";

export default function NoteLayour(props) {
    const { children } = props;
    return (
        <>
            <Suspense fallback={<h6 className="text-gradient">Loading...</h6>}>
                {children}
            </Suspense>
        </>
    )
}