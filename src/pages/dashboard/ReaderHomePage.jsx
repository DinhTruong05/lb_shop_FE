import ReaderHeader from "../../components/common/ReaderHeader";
import FeaturedBookCard from "../../components/layout/FeaturedBookCard";
import FeaturedCategoryCard from "../../components/layout/FeaturedCategoryCard";

export default function ReaderHomePage() {
  const featuredBooks = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      price: "12.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCheqFyx-Sc9yEyVKp5XpZtK2bMC_KFWaJbx7Og6jWhvhTA4VmKy3SpT_XKz13Uqs6YAepArNMsD1Y-6zcOSUR_HFbs2rF0JUtsaRx-t_UtQfL9fcy0LWxNWl5kJz3H5ovL21frUhVq5PB7iPAYAAKrRMalM1-USLV5bc8Ggw6T8NEd5MG0to-gMYpOR8Ewb_vWKPNaznYEMOCJVhlKlcwzDIX5iVLYSB2wjikdSkbi4EKCs0vZsEt4XCmCnNsqCkXFaqGjqvCqj4U-",
    },
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: "14.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnRIwcZ0Lc91begsn4ivSezWXMFqpTD_97Fgb468wqtwPKNWo9VcWu2AYKINar9Y1UipJy2XhUBXMnF_zf4J4QVFdWXga4-pOhRng2XDJQv0xem64vumEIQu6bHmOTsai2HAMgxJXcMleba3v_hmtdILQ-QkpcAVTX5rGXm9jy4O39_KXUdYHGBthKpdY0Hzy6dnchhimmoSd4Rh7blLAXJ99artTZ-FOw5vBfnx4FbywD-drKx3KXYtv4p8aRejgQZpKoyPafowqg",
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      price: "10.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBrFT5MmcIHifKQXA7J8Kw14zprS-mJSLfckZcQg6EbTdAq4mRLHdTfM7MLQ4pzlEyTUu9jinoCMSbsXasr-L37HiRhrY5yfk9EVQIj45x_85cvIcPAHl9hvB4JFPMggKNgNVo62I4k7R5nb-vycE8AIJuWsdjO0V7Y5RHqEvpve5cJt9tiSjpyRhP75eiEeEzPd4OR3SqK3cLw1ymxZIxN6V2355yiu-pGZaPG_eIdie6BDuWsmZHTmB7-d3-fTc45opFRwTx8PzJj",
    },
    {
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      price: "15.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAqmSCtC669i0StFAjVgjCtcfxoDZlft2V2gFEGveS63q0f4PR_zukMxM5Pmmm_yXSWuu__WvfqUvbyven2DxTHSw90Y7BYjbibiWmcnEArWPboFvGvVX4RJ7jt0CFlG1k-_sZk9HoJ7VXEz_vZ9dMkqAcbkcy-wI-GJAU_9eZ81ZcRADw_AZRRDpb_h6AViTIKUcn7pQZAr6sF6G_nMGX5J3lXxPdG7lvUuvwqjXCqGd45OpYyPw1GCo2E6K2_WLPLND4YooKcU6o",
    },
  ];

  const featuredCategories = [
    {
      title: "Science Fiction",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB7kISnkQ_7g7xApXpCkTojcVktD3gSbrddb3DVQD1GQML3mUpOpw_7bi5FBmxfHv7cEvDRliWzXP7nV7mxTcYU62egxcZpfl7yP9XYXeTVZhQ2_Xb-2_dE9MalXJ6xA3qHETM478KzG2R6iR-Vs0Mm_hzyAckJEk4xyMIDbO54dx1vRo8oxjy29MVP1l_fcpuw_h8PIKPd6Bs5fKSDVC3z6inA6orjpRozR93i-JnDNm2_SmNRqwGRE3r9e8EzVBy7NWkA_oUrfj78",
    },
    {
      title: "Mystery",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDY5oiXwa7ZWwqGNnWsHWKYOXH5mze-an7R8Xippn1JH9ICYioMM0dcuwFoxnrg615kMc7GJKaj6flAR_t7G36H3OTcP66_ekL_wsSIYTox4f_BlaD5l5VnWDvq5Pb8vxOQuO0lvWWFMeK4cNSRvBS1t-5HbAZR5poMkfPHUPP3xxqJCPx8qoj-0KTxJeg8qUPXrOiRmF_-UuiPAog-dP9bd41EmP2UVDbRvkb5tEMBIJNwWNif76WGxLxrZksUod3fsbYrabyjKZda",
    },
    {
      title: "Fantasy",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCC5CThsRHUMkfKqsPKuO5p4MS2AQ18NmM0jF957Ys_YKj6DXF8bYvMOvKSs3WQyF8mNyhf79dMV2KQn8sOsDorx9_Z6rvX6xiXItf7GyZ6SSzBNKW_0R8-K6Riyq_4urQ42ZHNKqV-wDlzo1nHOgrsNm6cPuC0SZaMxy2PBd78Oi6GliXiY0ey1GkNOpmEzLR6HAwoodvAltkMn-FQg-lbg9X6jiDf_8f3I1YdQiqQI_SpDaFkkousze5tiBDggr9P8pgpusEW6V1",
    },
  ];

  return (
    <div className="dark bg-background-dark text-text-primary-dark min-h-screen font-body">
    

      <main className="px-4 sm:px-10 md:px-20 lg:px-40">
        {/* HERO SECTION */}
        <section className="my-10">
          <div className="flex flex-col gap-6 px-4 py-10 lg:flex-row lg:items-center rounded-xl bg-surface-dark">
            {/* LEFT */}
            <div className="flex flex-col gap-6 lg:w-1/2">
              <h1 className="font-display text-4xl sm:text-5xl font-black">
                Welcome back, Alex!
              </h1>
              <p className="text-text-secondary-dark">
                Discover new worlds and timeless stories. Your next adventure awaits.
              </p>

              <button className="h-12 px-5 bg-accent-blue text-background-dark font-bold rounded-lg hover:opacity-90 transition">
                Explore New Arrivals
              </button>
            </div>

            {/* RIGHT */}
            <div
              className="w-full lg:w-1/2 aspect-video rounded-lg bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlje0WY_2VyspIIKmLV-xc9YTRJS3SsLnC-5upJdyInQgoja2DGul2ssUjfynhgFfMiFIxFHNdoVlm4C-4wSKgoSzcnrXZSGCxu6gNHgNtRhjL45eIgOuNlz4gt-h9hxGCGd3z13af527j1SpEnR5ef3NyBEkzfPJBq_EJcqAWL6eqMnKr1GAOd5Yu0UEwgOyIr117tbq2ErehQKcbPB9YHvoLPvVKniLOoJ3eBRkewmD5ZbYS1qKecZGlvc5vUhcND9cdnKsra5O_")',
              }}
            ></div>
          </div>
        </section>

        {/* FEATURED BOOKS */}
        <section className="my-10 space-y-4">
          <h2 className="text-[22px] font-display font-bold border-b-2 border-accent-purple/50 pb-2 px-2">
            Featured Books
          </h2>

          <div className="flex overflow-x-auto gap-6 p-4 scrollbar-hide">
            {featuredBooks.map((book, i) => (
              <FeaturedBookCard key={i} {...book} />
            ))}
          </div>
        </section>

        {/* FEATURED CATEGORIES */}
        <section className="my-10 space-y-4">
          <h2 className="text-[22px] font-display font-bold border-b-2 border-accent-purple/50 pb-2 px-2">
            Featured Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {featuredCategories.map((cat, i) => (
              <FeaturedCategoryCard key={i} {...cat} />
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 border-t border-surface-dark/50 py-8 text-center text-text-secondary-dark">
          <div className="flex justify-center gap-6 mb-4">
            <a className="hover:text-accent-blue transition" href="#">
              About Us
            </a>
            <a className="hover:text-accent-blue transition" href="#">
              Contact
            </a>
            <a className="hover:text-accent-blue transition" href="#">
              FAQ
            </a>
          </div>

          <p className="text-sm">© 2024 Library System. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
