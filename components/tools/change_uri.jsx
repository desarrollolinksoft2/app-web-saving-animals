import { usePathname, useSearchParams } from "next/navigation"

const ChangeUri = ({key, value} ) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    let params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    return pathname + "?" + params.toString();
    
}

export default ChangeUri