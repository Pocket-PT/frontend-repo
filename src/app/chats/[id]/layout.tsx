'use client';

import { MouseEventHandler, PropsWithChildren } from 'react';

const ChatRoomLayout = ({ children }: PropsWithChildren) => {
  const onClick = (e: any) => {
    e.preventDefault();
  };
  return (
    <div>
      {children}
      <form className="fixed inset-x-0 bottom-0 h-10 max-w-xl mx-auto">
        <div className="relative flex items-center w-full h-full mx-auto bg-gray">
          <input type="text" className="w-full h-full bg-lightGray" />
          <button
            onClick={onClick}
            className="absolute inset-y-0 flex text-xl bg-none left-2 place-items-center text-gray"
          >
            #
          </button>
          <div className="absolute inset-y-0 right-0 flex">
            <button className="px-3 text-white text-md bg-mainPurple focus:ring-2 focus:ring-offset-2 focus:ring-mainPurple hover:bg-mainPurple">
              &rarr;
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatRoomLayout;
