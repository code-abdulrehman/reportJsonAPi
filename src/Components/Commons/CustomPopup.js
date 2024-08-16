import React, { useState, useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';

function CustomPopover ({
  popOverTrigger,
  popOverContent,
  popoverTitle,
  closeArrow = false,
  isPopoverOpen: controlledIsOpen,
  handlePopoverToggle: controlledToggle,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isPopoverOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const popoverRef = useRef(null);

  const handlePopoverToggle = controlledToggle !== undefined
    ? () => controlledToggle(!isPopoverOpen)
    : () => setInternalIsOpen(!internalIsOpen);

  const handleClickOutside = (e) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
      setInternalIsOpen(false);
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <>
      <div onClick={handlePopoverToggle} className="cursor-pointer">
        {popOverTrigger}
      </div>
      {isPopoverOpen && (
        <div
          className="fixed rounded-2xl inset-0 z-[1000] flex items-center justify-center backdrop-blur-md h-[85vh] w-[80vw]"
          onClick={handlePopoverToggle} // This allows closing the popover when clicking outside
        >
          <div
            ref={popoverRef}
            className="shadow-xl h-[600px] min-w-96 rounded-2xl themeGlassBg backdrop-blur-xl text-gray-800 dark:text-white max-w-auto overflow-y-hidden border-orange-700 dark:border-orange-400 border "
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the popover from closing it
          >
            {(popoverTitle || closeArrow) && (
              <>
              <div className="flex justify-between items-center gap-2 mb-2 border-b border-orange-700 dark:border-orange-400 p-4">
                {popoverTitle && (
                  <div className="font-bold capitalize w-[70%] text-ellipsis overflow-hidden">{popoverTitle}</div>
                )}
                {closeArrow && (
                  <div onClick={handlePopoverToggle} className="group hover:bg-gray-200 dark:hover:bg-gray-800 p-1 rounded-md cursor-pointer">
                    <FaXmark className="text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-600" />
                  </div>
                )}
              </div>
              </>
            )}
            <div className='p-4 overflow-x-hidden overflow-y-auto h-[88%]'>
            {popOverContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomPopover;


// use 

{/* <CustomPopover
popOverTrigger={<button className="btn">Log in</button>}
popOverContent={<div className='min-h-96 h-[300px] w-[500px]'>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur aliquid nihil earum ullam mollitia alias maxime cupiditate asperiores laboriosam doloribus!</p>
</div>}
popoverTitle={<span> Title</span>}
closeArrow={true}
popOverContentPlacement="bottom"
/> */}