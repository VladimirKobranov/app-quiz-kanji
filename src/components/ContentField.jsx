import React, { useEffect } from "react";
import KanjiCard from "@/components/KanjiCard";

import { useStore } from "@/store/useStore";
import InfoMessage from "@/components/InfoMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function ContentField() {
  const levels = useStore((state) => state.levels);
  const inputs = useStore((state) => state.inputs);
  const toggleHint = useStore((state) => state.toggleHint);
  const currentDeck = useStore((state) => state.currentDeck);
  const currentPage = useStore((state) => state.currentPage);
  const itemsPerPage = useStore((state) => state.itemsPerPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  const totalPages = Math.ceil(currentDeck.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = currentDeck.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleHintClick = () => {
    toggleHint();
    console.log("hint dispatch");
  };

  return (
    <div className="flex flex-col gap-0 h-full bg-background text-foreground">
      <div className="w-full h-[100px] md:h-[100px] flex items-center px-4 flex-none border-b bg-background z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
          <p className="text-[18px] md:text-[30px] text-muted-foreground truncate">
            {levels.length
              ? "N" + levels.map((l) => parseInt(l, 10)).join(", N") // basic formatting
              : "Select level"}
          </p>
          <p className="text-[18px] md:text-[30px] text-muted-foreground/50 truncate">
            {inputs.length ? inputs.join(", ") : "Select inputs"}
          </p>
          {levels.length > 0 && (
            <p className="text-[14px] md:text-[20px] text-muted-foreground/60 truncate">
              {currentDeck.length} kanji for this level
            </p>
          )}
          {levels.length !== 0 && (
            <div className="md:hidden fixed top-[20px] right-[90px] z-40">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleHintClick}
                className="text-[24px] h-[60px] w-[60px] rounded-full shadow-sm"
              >
                ?
              </Button>
            </div>
          )}
        </div>
      </div>
      <ScrollArea className="w-full flex-1 min-h-0">
        {levels.length === 0 ? (
          <InfoMessage />
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2.5 gap-y-7.5">
              {currentData.map((name, index) => (
                <KanjiCard
                  key={name + index}
                  kanji={name}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      {levels.length > 0 && (
        <div className="flex-none p-2 border-t bg-background z-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* Simple pagination logic: show current page and neighbors, or just a few */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                // Show first, last, current, and neighbors
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ContentField;
