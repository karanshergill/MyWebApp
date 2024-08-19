import { useState } from 'react';
import navigationItems from '../../data/navigationItems';

export const MobileNavigation = ({ currentPath }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div>
            <button
                className="inline-flex md:hidden"
                onClick={() => setIsNavOpen(!isNavOpen)}
            >
                <img
                    src={isNavOpen ? "/src/icons/menu-close.svg" : "/src/icons/menu-open.svg"}
                    className="h-6"
                    alt="Navigation Icon"
                />
            </button>


            <ul className={`absolute flex-col gap-6 font-description text-lg text-white ${isNavOpen ? 'block' : 'hidden'} md:hidden`}>
                {navigationItems.map((item) => (
                    <li key={item.path}>
                        <a
                            href={item.path}
                            className={currentPath === item.path ? "active-class" : ""}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
            </div>
    );
};
