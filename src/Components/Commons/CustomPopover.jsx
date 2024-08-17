import React, { useState, useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';

function CustomPopover({
  popOverTrigger,
  popOverContent,
  popoverTitle,
  closeArrow = false,
  isPopoverOpen: controlledIsOpen,
  handlePopoverToggle: controlledToggle,
  onSuccess
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

  useEffect(() => {
    if (onSuccess && !isPopoverOpen) {
      onSuccess();
    }
  }, [isPopoverOpen, onSuccess]);

  return (
    <>
      <div onClick={handlePopoverToggle} className="cursor-pointer">
        {popOverTrigger}
      </div>
      {isPopoverOpen && (
        <div
          className="fixed rounded-2xl inset-0 z-[1000] flex items-center justify-center backdrop-blur-md"
          onClick={handlePopoverToggle} // This allows closing the popover when clicking outside
        >
          <div
            ref={popoverRef}
            className="border-b-2 w-[600px] rounded-2xl backdrop-blur-xl shadow-md shadow-yellow-500 bg-slate-600 text-gray-100 max-w-auto overflow-y-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the popover from closing it
          >
            {(popoverTitle || closeArrow) && (
              <>
                <div className="flex justify-between items-center gap-2 mb-2 p-4 border-b-2 border-gray-500">
                  {popoverTitle && (
                    <div className="font-bold capitalize w-[70%] text-ellipsis overflow-hidden text-yellow-500 text-xl">
                      {popoverTitle}
                    </div>
                  )}
                  {closeArrow && (
                    <div onClick={handlePopoverToggle} className="group/icon p-1 rounded-md cursor-pointer hover:bg-red-500 group/icon hover:text-white">
                      <FaXmark className="text-xl group-hover/icon:text-white text-red-500 group-hover:text-red-500" />
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
}

export default CustomPopover;
