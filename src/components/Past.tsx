export interface PastItemInterface{
    title: string;
    description: string;
}

const PastItem = ({ title, description }: PastItemInterface) => {
    return (
        <div className = "box-border pl-3 border-black dark:border-white border-l-[1px] relative text-left w-3/4">
            <div className = "mb-5 ml-2">
                <h1 className = "text-xl font-bold">{title}</h1>
                <p className = "font-normal dark:opacity-50">{description}</p>
            </div>
            <div className = "w-2 h-2 rounded-[50%] bg-black dark:bg-white absolute left-[-4px] top-[10px]"></div>
        </div>
    )
}

export default PastItem;