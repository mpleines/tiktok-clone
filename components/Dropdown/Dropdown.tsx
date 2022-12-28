import styles from "./Dropdown.module.css";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import React, { FunctionComponent, ReactNode } from "react";

interface DropdownProps {
  MenuButton: ReactNode;
  links: { href: string; label: ReactNode }[];
}

const Dropdown: FunctionComponent<DropdownProps> = ({ MenuButton, links }) => {
  return (
    <Menu as="div" className={styles.wrapper}>
      <Menu.Button as={React.Fragment}>{MenuButton}</Menu.Button>
      <Menu.Items className={styles.items}>
        {links.map((link) => (
          <Menu.Item key={link.href}>
            {({ active }) => (
              <Link
                href={link.href}
                className={active ? styles.active : styles.item}
              >
                {link.label}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default Dropdown;
