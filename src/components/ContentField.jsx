import React, { useEffect, useRef, memo, useCallback } from "react";
import KanjiCard from "@/components/KanjiCard";
import { ListFilter } from "lucide-react";

import { useStore } from "@/store/useStore";
import InfoMessage from "@/components/InfoMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { KANJI_CARD } from "@/config/constants";

const ContentField = memo(function ContentField() {
  const inputs = useStore((state) => state.inputs);
  const sortMode = useStore((state) => state.sortMode);
  const setSortMode = useStore((state) => state.setSortMode);
  const loading = useStore((state) => state.loading);
  const currentDeck = useStore((state) => state.currentDeck);
  const currentPage = useStore((state) => state.currentPage);
  const itemsPerPage = useStore((state) => state.itemsPerPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setItemsPerPage = useStore((state) => state.setItemsPerPage);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || currentDeck.length === 0) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width: containerWidth, height: containerHeight } =
        entry.contentRect;
      if (containerWidth <= 0 || containerHeight <= 0) return;

      const cardWidth = KANJI_CARD.WIDTH;
      const cardGapX = KANJI_CARD.GAP_X;
      const cardBaseHeight = KANJI_CARD.BASE_HEIGHT;
      const cardGapY = KANJI_CARD.GAP_Y;
      const inputHeight = inputs.length * KANJI_CARD.INPUT_HEIGHT;
      const rowHeight = cardBaseHeight + inputHeight + cardGapY;

      const width = containerWidth - 32;
      const height = containerHeight - 32;

      const cols = Math.floor((width + cardGapX) / (cardWidth + cardGapX)) || 1;
      const rows = Math.floor((height + cardGapY) / rowHeight) || 1;

      const newItemsPerPage = cols * rows;

      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [inputs.length, setItemsPerPage, currentDeck.length, itemsPerPage]);

  const totalPages = Math.ceil(currentDeck.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = currentDeck.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages, setCurrentPage],
  );

  return (
    <div className="flex flex-col gap-0 h-full bg-background text-foreground">
      <div className="z-10 flex h-14 w-full flex-none items-center gap-2 border-b bg-background px-3 py-2 md:h-[60px] md:px-4 md:py-0">
        <SidebarTrigger className="size-9 shrink-0" />
        <div className="ml-auto flex h-9 items-center gap-2">
          <ListFilter className="size-4 shrink-0 text-muted-foreground" />
          <Select value={sortMode} onValueChange={setSortMode}>
            <SelectTrigger className="h-9 w-[132px] font-semibold">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random">Random</SelectItem>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="strokes">By strokes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div ref={containerRef} className="w-full flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="w-full h-full">
          {currentDeck.length === 0 && !loading ? (
            <InfoMessage />
          ) : loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2.5 gap-y-7.5">
                {currentData.map((name, index) => (
                  <KanjiCard key={name + index} kanji={name} />
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {currentDeck.length > 0 && !loading && (
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
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
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
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
});

export default ContentField;
