'use client';

import { signOutAction } from '@/app/lib/actions';
import { signOut } from '@/app/pages/api/auth/[...nextauth]';
import Link from 'next/link';
import styles from './menu.module.css';
import { useState } from "react";

export default function FloatingMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <nav className={styles.menu}>
                <input
                    type="checkbox"
                    className={styles.menuopen}
                    name="menuopen"
                    id="menuopen"
                >
                </input>
                <label className={styles.menuopenbutton} htmlFor="menuopen">
                    <span className={styles.hamburger}></span>
                    <span className={styles.hamburger}></span>
                    <span className={styles.hamburger}></span>
                </label>
                <div className={styles.containeritems}>
                    <div className="flex gap-3 lg:gap-10">
                        <a
                            href="/protected/profile"
                            className={styles.menuitem}>
                            <span>Profile</span>
                        </a>
                        <a
                            href="/protected"
                            className={styles.menuitem}>
                            <span>Home</span>
                        </a>
                    </div>
                    <div className="flex gap-3 lg:gap-10">
                        <a
                            href="/protected/profile"
                            className={styles.menuitem}>
                            <span>Favorites</span>
                        </a>
                        <form action={signOutAction} className={styles.menuitem}>
                            <button>Sign Out</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
