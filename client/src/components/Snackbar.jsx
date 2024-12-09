export default function Snackbar({text, subText}) {

    return (
        <div className="flex flex-col bg-accent1 text-primary2 absolute top-32 left-0 py-2 px-3 shadow-inner animate-slide-in-out">
            <h2 className="font-bold">{text}</h2>
            {subText && (
                <p className="text-accent2 font-semibold">{subText}</p>
            )}
        </div>
    )
}