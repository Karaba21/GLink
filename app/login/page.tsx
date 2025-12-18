import Navbar from '@/components/Navbar';
import Login from '@/components/Login';


export default function LoginPage() {
    return (
        <main className="min-h-screen pt-20 flex items-center justify-center">
            <Navbar />
            <div className="w-full">
                <Login />
            </div>
        </main>
    );
}
