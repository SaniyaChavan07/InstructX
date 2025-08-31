import { CreditCard, LayoutDashboardIcon, LogOut, Menu, School2Icon, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import DarkMode from '@/pages/DarkMode';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const {user} = useSelector(store=>store.auth);
    const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async() => {
        await logoutUser();
    };

    useEffect(() => {
        if(isSuccess) {
            toast.success(data.message || "Logged out successfully.");
            navigate("/login");

        }
    } , [isSuccess])
    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School2Icon size={"30"} />
                    <h1 className='hidden md:block text-2xl font-extrabold'>InstructX</h1>
                </div>
                
                <div className='flex items-center gap-8'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User />
                                            <Link to="my-learning">My learning</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CreditCard />
                                            <Link to="profile">Edit Profile</Link>{""}
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuItem onClick={logoutHandler}>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                    {
                                        user.role === "instructor" && (
                                            <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <LayoutDashboardIcon />
                                                Dashboard
                                            </DropdownMenuItem>
                                            </> 
                                        )
                                    }
                                    
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/login")}>Signup</Button>
                            </div>
                        )}
                    <DarkMode />

                </div>
            </div>
            {/* Mobile device */}
            <div className='flex md:hidden items-center justify-between h-full px-4'>
                <h1 className='font-extrabold text-2xl'>InstructX</h1>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar;

const MobileNavbar = () => {
    const role = "instructor";
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>InstructX</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className='mr' />
                <nav className='flex flex-col space-y-4'>
                    <span> My Learning</span>
                    <span> Edit Profile</span>
                    <p> Log out</p>
                </nav>
                {
                    role === "instructor" && (
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
            </SheetContent>
        </Sheet>
    );
}
