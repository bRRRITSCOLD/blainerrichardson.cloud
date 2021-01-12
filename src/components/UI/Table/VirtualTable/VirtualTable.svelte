<script lang="ts">
  // node_modules
  import { Divider } from 'svelte-materialify/src';
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // props
  export let rows: any[] = []; // Rows to display
  export let columns = []; // Array of column definitions: { display: '', dataName: ''}, where display is what the display value is and dataName is what the key on the row object is
  export let rowHeight = 24; // Row height in pixels
  
  const MIN_COLUMN_SIZE = 30;

  // internals
  let __extraRows = 10; // Number of extra rows to render beyond what is visible in the scrollable area
  let __affixedColumnIndices = []; // DO NOT MODIFY DIRECTLY. The column indices to affix to the left side of the grid
  let __resizing = false; // DO NOT MODIFY DIRECTLY. Whether or not a column is currently being resized
  let __innerOffsetHeight = 0; // DO NOT MODIFY DIRECTLY. The height of the scrollable area on screen
  let __scrollTop = 0; // DO NOT MODIFY DIRECTLY. The scrollTop position of the scrollable area
  let __scrollLeft = 0; // DO NOT MODIFY DIRECTLY. The scrollLeft position of the scrollable area
  let __scrolledAllTheWayToTheRight = false; // DO NOT MODIFY DIRECTLY. Whether the container is scrolled all the way to the right as of the last onscroll event

  // create html refs
  let wrapper;
  let tableSpace;

   function getCellLeft({
    i,
    columnWidths,
    __affixedColumnIndices,
    __scrollLeft
  }) {
    if (__affixedColumnIndices.indexOf(i) >= 0) {
      if (i === 0) {
        return __scrollLeft;
      }
      let left = __scrollLeft;
      for (let j = i - 1; j >= 0; j--) {
        left += columnWidths[j];
      }
      return left;
    }
    let left = 0;
    for (let j = 0; j < i; j++) {
      left += columnWidths[j];
    }
    return left;
  }

  function onScroll() {
    // get new scroll values from the scroll area
    const { scrollTop: newScrollTop, scrollLeft: newScrollLeft } = tableSpace;
    /*
     * To avoid doing unnecessary re-calculation of computed variables, don't set the scroll
     * properties that haven't changed
     */
    if (__scrollTop !== newScrollTop) {
      __scrollTop = newScrollTop;
    }
    if (__scrollLeft !== newScrollLeft) {
      __scrollLeft = newScrollLeft;
    }
    __scrolledAllTheWayToTheRight =
      Math.ceil(tableSpace.scrollWidth - tableSpace.scrollLeft) ===
      tableSpace.clientWidth;
  }

  /**
   * Array of column widths
   */
  let columnWidths = columns.map(x => x.width || MIN_COLUMN_SIZE); //TODO setter probably not needed due to reactive statement
  $: {
    // if width was not provided for this column, give it a default value
    columnWidths = columns.map(x => x.width || MIN_COLUMN_SIZE);
  }

  /**
   * The number of rows we have
   */
  let numRows = rows.length; //TODO setter probably not needed due to reactive statement
  $: {
    numRows = rows.length;
  }

  /**
   * Width of the overall grid space
   */
  let gridSpaceWidth = 0; //TODO setter probably not needed due to reactive statement
  $: {
    let sum = 0;
    for (let i = 0; i < columnWidths.length; i++) {
      sum += columnWidths[i];
    }
    /**
     * If the table is scrolled all the way to the right, resizing columns could
     * accelerate until the column is the minimum width. Add some extra space on the right
     * to ensure this undesired behavior does not happen. This doesn't seem like a perfect solution
     * but it works for now until I can think of something better.
     */
    if (__resizing && __scrolledAllTheWayToTheRight) {
      sum *= 2;
    }
    gridSpaceWidth = sum;
  }

  let gridSpaceHeight = rowHeight * numRows; //TODO setter probably not needed due to reactive statement
  $: {
    gridSpaceHeight = rowHeight * numRows;
  }

  let numRowsInViewport = Math.ceil(__innerOffsetHeight / rowHeight);
  $: {
    numRowsInViewport = Math.ceil(__innerOffsetHeight / rowHeight);
  }

  let visibleRows: any[];
  $: {
    const start = Math.max(
      0,
      Math.floor(__scrollTop / rowHeight - __extraRows / 2)
    );
    const end = start + numRowsInViewport + __extraRows;
    visibleRows = rows.slice(start, end).map((x, i) => {
      return {
        i: i + start, // for aria-rowindex
        data: x // the row data
      };
    });
  }

  const getCellZIndex = function(__affixedColumnIndices, i) {
    return __affixedColumnIndices.indexOf(i) === -1 ? 1 : 2;
  };

  const getRowTop = function(i, rowHeight) {
    return i * rowHeight;
  };

  // handlers
</script>

<style>
  .virtual-table-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .virtual-table-headers {
    position: absolute;
    overflow: hidden;
    max-width: 100%;
    width: 100%;
    top: 0;
    left: 0;
    /* border-bottom: 2px solid black; */
  }

  .virtual-table-header-row {
    position: absolute;
    overflow: hidden;
    top: 0;
  }

  .virtual-table-row {
    position: absolute;
    overflow: hidden;
    top: 0;
  }

  .virtual-table-cell {
    position: absolute;
    top: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .virtual-table-body {
    overflow: auto;
  }

  .virtual-table-body-contents {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    /* pointer-events: none; */
    z-index: 3;
  }
  .virtual-table-row:not(:last-child) {
    /* border-bottom: 1px solid #666; */
  }
</style>
<!-- 
<div
  class="virtual-table-wrapper"
  style="padding-top: {rowHeight}px; border: 5px solid red;"
  bind:this={wrapper}
> -->
<div
class="virtual-table-wrapper"
style="padding-top: {rowHeight}px;"
bind:this={wrapper}
>
  <div
    class="virtual-table-headers"
    style="height: {rowHeight}px;"
  >
    <div
      class="virtual-table-header-row"
      style="left: -{__scrollLeft}px; height: {rowHeight}px; width: {gridSpaceWidth}px;"
    >
      {#each columns as column, i (i)}
        <div
          class="virtual-table-cell mdc-data-table__header-cell"
          style="z-index: {
            getCellZIndex(__affixedColumnIndices, i)
          }; left: {
            getCellLeft({
              i,
              columnWidths,
              __affixedColumnIndices,
              __scrollLeft
            })
          }px; width: {
            columnWidths[i]
          }px; height: {
            rowHeight
          }px; line-height: {
            rowHeight
          }px;"
        >
          <svelte:component this={column.headerComponent} {column} />
        </div>
      {/each}
    </div>
  </div>

  <div
    class="virtual-table-body"
    bind:this={tableSpace}
    bind:offsetHeight={__innerOffsetHeight}
    on:scroll={onScroll}
    style="height: 100%;"
  >
    <div
      class="virtual-table-body-contents"
      style="width: {gridSpaceWidth}px; height: {gridSpaceHeight}px;"
    >
    {#each visibleRows as row, i}
      <div
        class="virtual-table-row"
        style="top: {getRowTop(row.i, rowHeight)}px; height: {rowHeight}px;
        width: {gridSpaceWidth}px;"
        role="row"
        aria-rowindex={row.i}>
        {#each columns as column, j}
          <div
            class="virtual-table-cell"
            style="z-index: {getCellZIndex(__affixedColumnIndices, j)}; left: {getCellLeft(
              { i: j, columnWidths, __affixedColumnIndices, __scrollLeft }
            )}px; height: {rowHeight}px; line-height: {rowHeight}px; width: {columnWidths[j]}px; padding-left: 0px; padding-right: 0px;"
            role="cell"
            on:click={(event) => {
              dispatch('onVirtualTableRowCellClick', {
                columnIndex: j,
                rowIndex: row.i
              });
            }}
            on:dblclick={(event) => {
              dispatch('onVirtualTableRowCellDoubleClick', {
                columnIndex: j,
                rowIndex: i
              });
            }}
          >
            {#if column.cellComponent}
            <svelte:component
              this={column.cellComponent}
              {...column}
              rowWidth={columnWidths[j]}
              {...row}
              on:click={(event) => {
                dispatch('onVirtualTableRowCellComponentClick', {
                  columnIndex: j,
                  rowIndex: row.i
                });
              }}
              on:dblclick={(event) => {
                dispatch('onVirtualTableRowCellComponentDoubleClick', {
                  columnIndex: j,
                  rowIndex: i
                });
              }}
              on:change={(event) => {
                console.log('{}VirtualTable::svelte component::on change::event=', event);
              }}
            />
            {:else}
              <div class="cell-default">{row.data[column.dataName] || ''}</div>
            {/if}
          </div>
        {/each}
      </div>
    {/each}
    </div>
  </div>
</div>
