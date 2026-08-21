import { currentUser } from "@/lib/current.user";
import { SearchInputNavbar } from "./SearchInput.Navbar";
import { AvatarWithBadge } from "./Avatar";


const Navbar = async () => {

    const user = await currentUser();
    const { image } = user


    return (
        <div className="w-full flex justify-between items-center pr-4">
            <div className="flex items-center justify-between space-x-2">
                <h2> Archive </h2>
                <SearchInputNavbar />
            </div>

            <div>
                <AvatarWithBadge />
            </div>
        </div>
    );
};

export default Navbar;