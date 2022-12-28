import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import MaxWidth from "../MaxWidth/MaxWidth";
import styles from "./Navigation.module.css";
import { FiSettings, FiUser } from "react-icons/fi";

interface NavigationProps {
  openLoginModal: () => void;
}

const Navigation: FunctionComponent<NavigationProps> = ({ openLoginModal }) => {
  const session = useSession();
  const router = useRouter();

  const userId = session.data?.user.id;
  const avatarUrl = session.data?.user.image;

  return (
    <nav className={styles.wrapper}>
      <MaxWidth>
        <div className={styles.flex}>
          <div>
            <h1 className={styles.title}>ShigTok</h1>
          </div>
          <div className={styles.actions}>
            {session.data == null ? (
              <Button title="Sign In" onClick={openLoginModal} />
            ) : (
              <>
                <Button
                  title="Upload a Video"
                  onClick={() => router.push("/upload")}
                />
                <Dropdown
                  MenuButton={
                    <button className={styles.avatarButton}>
                      <Avatar avatarUrl={avatarUrl} />
                    </button>
                  }
                  links={[
                    {
                      href: `/profile/${userId}`,
                      label: (
                        <div className={styles.iconLink}>
                          <FiUser /> Profile
                        </div>
                      ),
                    },
                    {
                      href: "/settings",
                      label: (
                        <div className={styles.iconLink}>
                          <FiSettings /> Settings
                        </div>
                      ),
                    },
                  ]}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidth>
    </nav>
  );
};

export default Navigation;
