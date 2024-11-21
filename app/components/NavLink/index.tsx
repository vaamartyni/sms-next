import Link from "next/link";
import styles from "./navlink.module.scss";

type NavLinkProps = {
    href: string;
    label: string;
};

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
    return (
        <li className={styles.navItem}>
            <Link href={href} className={styles.navLink}>
                {label}
            </Link>
        </li>
    );
};

export default NavLink;
