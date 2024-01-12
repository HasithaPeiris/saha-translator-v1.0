import React from 'react'

export default function AboutUs() {
  return (
    <section class="flex items-center bg-stone-100 xl:h-screen font-poppins dark:bg-gray-800 ">

    <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">

        <div class="flex flex-wrap ">

            <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">

                <img src="https://images.pexels.com/photos/226611/pexels-photo-226611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""

                    class="relative z-40 object-cover w-full h-96 rounded-3xl"/>

            </div>

            <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">

                <h2 class="mb-4 text-4xl text-blue-500 dark:text-gray-300 font-bold">

                    About Us

                </h2>

                <p class="mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">

                We are a dedicated team of SLIIT university students, passionate about language and technology. Our mission is to bridge the language gap and facilitate effective communication across cultures. Our team members,<span style={{fontWeight:'bold'}}>W.G.S.H.V Wickramasinghe</span > and <span style={{fontWeight:'bold'}}>Hasitha</span>, have come together to create a versatile and user-friendly translator web application that offers more than just basic translations.

                </p>

            </div>

        </div>

    </div>

</section>
  )
}
