import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <Image 
                    src="/sustainable_tech_solution.png" // No './public' needed
                    alt="Logo" 
                    width={200} 
                    height={180} 
                    priority 
                />
            </Link>
        </div>
    );
};

export default Logo;