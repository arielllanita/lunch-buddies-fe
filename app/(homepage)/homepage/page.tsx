import { auth_options } from "@/lib/auth_options";
import { getServerSession } from "next-auth";
import HomepageWrapper from "./_components/homepage.wrapper";
import { HomepageContext } from "./_context/homepage.context";

export default async function Employee() {
  const session = await getServerSession(auth_options);

  // const C = HomepageWrapper({
  //   children(context) {
  //     console.log("ere", context);

  //     return <p>hello</p>;
  //   },
  // });

  return (
    <>
      <div className="px-16 py-10">
        <h1 className="text-4xl">Good morning, {session?.user.first_name}!</h1>
        <p className="text-lg">What&apos;s your food mood today?</p>
      </div>

      {/* <C /> */}

      <HomepageWrapper>
        {() => <p>hello</p>}
      </HomepageWrapper>

      {/* {mainDish.length > 0 && (
        <div className="px-16 py-5">
          <h2 className="text-3xl font-bold">Main Dish</h2>
          <p className="text-primary mb-5">with Rice</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {mainDish.map((menu, i) => (
              <DishContainer key={i} menu={menu} />
            ))}
          </div>
        </div>
      )}

      {sideDish.length > 0 && (
        <div className="px-16 py-5 bg-slate-50">
          <h2 className="text-3xl font-bold">Side Dish</h2>
          <p className="text-primary mb-5">{sideDish.length} meal/s listed</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {sideDish.map((menu, i) => (
              <DishContainer key={i} menu={menu} />
            ))}
          </div>
        </div>
      )}

      {extraDish.length > 0 && (
        <div className="px-16 pt-5 pb-14">
          <h2 className="text-3xl font-bold">Extra Dish</h2>
          <p className="text-primary mb-5">{extraDish.length} meal/s listed</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {extraDish.map((menu, i) => (
              <DishContainer key={i} menu={menu} />
            ))}
          </div>
        </div>
      )} */}
    </>
  );
}
