import tw, { styled } from 'twin.macro';

// Buttons
export const Button = tw.button`px-3 py-3 rounded text-sm font-poppins font-medium`;
export const PrimaryButton = tw(Button)`bg-blue-500 text-white`;
export const SecondaryButton = tw(Button)`bg-pink-500 text-white`;

// Containers
export const Paper = tw.section`mx-auto md:my-8 md:p-8 md:w-[90vw] md:bg-white md:shadow-md md:rounded-[0.425rem] md:shadow-slate-200`;

// Headings
export const Title = tw.h1`text-2xl font-semibold text-center md:text-3xl`;
