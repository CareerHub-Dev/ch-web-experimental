import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ModalPortal } from "./ModalPortal";

export function ModalLoading(props: { show: boolean }) {
  return (
    <ModalPortal>
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform transition-all text-center">
                  <Dialog.Title as="h3" className="sr-only">
                    {"Завантаження..."}
                  </Dialog.Title>
                  <LoadingSpinner className="text-blue-800 h-32 w-32 opacity-100" />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </ModalPortal>
  );
}
