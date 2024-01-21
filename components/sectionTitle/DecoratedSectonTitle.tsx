import Image from "next/image";

type SectionTitleProps = {
    title: string;
    styles?: string
}

const DecoratedSectonTitle = ( { title, styles } : SectionTitleProps ) => {
    return (
        <div
          className="container grid gap-3.5 lg:gap-7 items-center select-none pb-9"
          style={{
            gridTemplateColumns: "0.5fr 1.25fr 1.5fr 1.25fr 0.5fr"
          }}
        >
          <div style={{ margin: "0px auto" }}>
            <Image
              src="/icons/icon_diamond.svg"
              alt="diamond icon"
              width={60}
              height={55}
              style={{objectFit: 'cover'}}
            />
          </div>

          <div className="w-100 h-1 bg-customPink"></div>

          <h2 className="text-center whitespace-nowrap font-title">
            { title }
          </h2>

          <div className="w-100 h-1 bg-customPink"></div>

          <div style={{ margin: "0px auto" }}>
            <Image
              src="icons/icon_diamond.svg"
              alt="diamond icon"
              width={60}
              height={55}
              style={{objectFit: 'cover'}}
            />
          </div>
      </div>
    );
};

export default DecoratedSectonTitle;