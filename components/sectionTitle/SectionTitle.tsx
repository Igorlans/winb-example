type SectionTitleProps = {
    title: string;
    styles?: string
}

const SectionTitle = ( { title, styles } : SectionTitleProps) => {
    return (
        <div
            className={`grid z-10 gap-3.5 lg:gap-7 pb-[30px] items-center select-none ${styles}`}
            style={{
                gridTemplateColumns: "1.25fr 1.5fr 1.25fr",
            }}
        >
            <div className="w-100 h-1 bg-customPink"></div>

                <h2 className="font-title text-center text-customPink whitespace-nowrap">
                    { title }
                </h2>

            <div className="w-100 h-1 bg-customPink"></div>
        </div>
    );
};

export default SectionTitle;