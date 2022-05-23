import { Tag } from "antd"
//import { useState } from "react";

const Tree = (props: any) => {

  const tree = props.data;
  const crrTag = props.currentTag || '';
  const option = props.option || {};
  const nodeHeight = option.nodeHeight || 24;
  const rowGap = option.rowGap || 8;
  const linePadding = option.linePadding || 10;
  const depthGap = option.depthGap || 50;


  let depth: any = 0;
  let rank: any = {};
  let treeRow: any = [];
  let currentRank = 0;

  const makeTree = (step: number, id: any) => {
    if (!treeRow[currentRank]) treeRow.push([]);
    tree.forEach((item: any) => {
      if (item.id === id) {
        treeRow[currentRank] = item.name;
        rank[`${item.name}`] = step;
        currentRank++;
        step++;
      }
    })
    let flag = true;
    tree.forEach((item: any) => {
      if (item.parent_id === id) {
        flag = false; if (step > depth) depth = step; return makeTree(step, item.id);
      }
    })
    if (flag) return;
  }



  for (let i = 0; i < tree.length; i++) {
    if (tree[i].parent_id === null) {
      makeTree(0, tree[i].id);
      if (!treeRow.includes(crrTag)) {
        currentRank = 0;
        treeRow = [];
      }
      else break;
    }
  }

  // const createTree = (tree: any, step: any) => {
  //   if (!treeRow[currentRank]) treeRow.push([]);
  //   treeRow[currentRank] = (tree);
  //   rank[`${tree.title}`] = step;
  //   currentRank++;
  //   step++;
  //   if (!tree.children) return;
  //   else {
  //     if (step > depth) { depth = step; }
  //     tree.children.map((item: any) => {
  //       return createTree(item, step);
  //     })
  //   }
  // }



  let treeGroup: any = [];



  // for (let i = 0; i < tree.length; i++)
  //   createTree(tree[i], 0);

  // console.log(treeRow);

  let renderStatus: any = {};
  let prevRank = 0;

  for (let i = 0; i < currentRank; i++) {
    const crrItem = treeRow[i];
    const crrRank = rank[`${crrItem}`];
    const getStyleFunc = props.nodeStyle || (() => { });
    let paddingLeft = depthGap * crrRank;
    const customStyle = getStyleFunc(crrItem) || {};

    // if (prevRank !== crrRank) renderStatus[`depth${crrRank}`] = 0;
    if (prevRank < crrRank) {
      renderStatus[`depth${crrRank - 1}`] = 0;
      renderStatus[`depth${crrRank}`] = -1;
    } else if (prevRank > crrRank) {
      for (let j = crrRank; j <= prevRank; j++) {
        renderStatus[`depth${j}`] = 0;
      }
    }

    for (let j = 0; j <= crrRank; j++) {
      const key = `depth${j}`;
      renderStatus[key] = renderStatus[key] + 1;
    }
    const unitHeight = 0.5 * nodeHeight + rowGap;
    const crrDepth = renderStatus[`depth${crrRank - 1}`] || 0;
    const crrHeight = unitHeight * crrDepth + 0.5 * nodeHeight * (crrDepth - 1);
    let crrParentId: any = null;
    tree.forEach((item: any) => {
      if (item.name === crrItem) crrParentId = item.parent_id;
    })
    let crrParentName = "";
    if (crrParentId !== null)
      tree.forEach((item: any) => {
        if (item.id === crrParentId) crrParentName = item.name;
      })
    let extraGap = 0;
    if (crrParentId !== null) extraGap = 10 - (crrParentName.length - 1) * 2;
    treeGroup.push(
      <div className='tree-item' key={i} style={{ paddingBottom: rowGap }}>
        {crrRank > 0 && <div className='tree-item-gap' style={{ width: paddingLeft, }}>
          <div
            className='tree-item-gap-line'
            style={{
              width: depthGap - linePadding + extraGap,
              height: crrHeight,
              bottom: 0
            }}
          />
        </div>}
        <Tag
          className='tree-item-node'
          style={{ height: nodeHeight, color: "white", border: "1px solid", borderRadius: "3px", ...customStyle }}
        >
          {crrItem}
        </Tag>
      </div>
    )
    prevRank = crrRank
  }

  return (
    <div className='container-component-tree'>
      {treeGroup}
    </div>
  )
}
export default Tree;


