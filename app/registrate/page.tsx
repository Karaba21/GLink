import Navbar from '@/components/Navbar';
import Registrate from '@/components/Registrate';


export default function RegistratePage() {
    return (
        <main className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
            <Navbar />
            <div className="w-full">
                <Registrate />
            </div>
        </main>
    );
}
