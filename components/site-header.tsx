import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthButtonServer } from "./auth-button-server"
import NavbarAvatar from "./navbar-avatar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/app/types/database"
import { cookies } from "next/headers"
import HeaderMobile from "./site-header-mobile"

export async function SiteHeader() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    let avatarUrl = "";
    let userFullName = "";
    let userRole = "";
  
    if (userId) {
      const { data: userData, error } = await supabase
        .from("profiles")
        .select("avatar_url, full_name, role")
        .eq("id", userId)
        .single();
    }
  return (
    <section>
    <div className="block md:hidden">
    <HeaderMobile />
    </div>
    <header className="bg-background sticky top-0 z-40 w-full hidden md:block">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 ">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.discord className="h-5 w-5 fill-current" />
                <span className="sr-only">Discord</span>
              </div>
            </Link>
            <ThemeToggle />
        <div className="hidden md:flex">
          {userId && (
            <NavbarAvatar
              avatar_url={avatarUrl}
              id={userId}
              userFullName={userFullName}
              userRole={userRole}
            />
          )}
          <AuthButtonServer />
        </div>
          </nav>
        </div>
      </div>
    </header>
    </section>
  )
}
