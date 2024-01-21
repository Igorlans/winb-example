type ArrowBottomProps = {
    isActive?: boolean;
    color?: string;
    prop?: string;
};

const ArrowBottom = ( { isActive, prop, color='black' } : ArrowBottomProps ) => {
    return (
        <svg className={`${isActive ? 'rotate-180' : null}  @apply transition-all duration-[ease-out] delay-[.5s] ${prop}`} width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11L21 1" stroke={color} stroke-width="2"/>
        </svg>
    );
};

export default ArrowBottom;