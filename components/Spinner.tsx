export default function Spinner({ size = 7, strokeWidth = 3 }: { size?: number, strokeWidth?: number }) {
    const sizeClasses = `border-t-blue-500 m-auto border-gray-300 rounded-full animate-spin`;
    return (
        <div
            className={sizeClasses}
            style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem`, borderWidth: `${strokeWidth}px` }} // Example using rem units (1 unit = 0.25rem by default in Tailwind)
        ></div>
    );
}