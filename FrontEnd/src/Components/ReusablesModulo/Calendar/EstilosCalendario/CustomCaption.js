export function CustomCaption({ displayMonth, locale, className }) {
    return (
        <div className={className.caption} style={{ textAlign: 'center' }}>
            <span className={className.caption_label}>
                {displayMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
            </span>
        </div>
    );
};