import { forwardRef } from 'react';
import './ScrollableList.css'
import PlayerLabel from '../PlayerDisplay/PlayerLabel/PlayerLabel';
import { filterPlayers } from '../PlayerDisplay/PlayerList/PlayerList';
import { getFullRefId } from '../PlayerDisplay/PlayerLabel/PlayerLabel';



const ScrollableList = forwardRef((props, allRefs) => {
    const { id, players, draftedMap, setDraftedMap, includeDrafted, pickNum, setPickNum, anchorPlayerId } = props

    return (
        <div className="app">
            <div className="scroller" id={id} ref={el => allRefs[id] = el} anchor_player_id={anchorPlayerId}>
                {filterPlayers(players, includeDrafted, draftedMap).map(player => {
                    return (
                        <PlayerLabel
                            ref={allRefs}
                            key={player.player_id}
                            player={player}
                            draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                            pickNum={pickNum} setPickNum={setPickNum}
                            parentId={id}
                        />
                    );
                })}
            </div>
        </div>
    )
}
)

const anchorPlayerDrop = 200

export function scrollToAnchorPlayer(scrollerDivId, allRefs) {
    const anchorPlayerId = allRefs[scrollerDivId].getAttribute("anchor_player_id")
    const refKeyToPlayerLabel = getFullRefId(scrollerDivId, anchorPlayerId)

    // I don't understand why the above works (to get the DOM element) but this doesn't
    //  without .current. In fact, it onyl seems to work WITHOUT .current above and WITH
    //  .current here
    let top = allRefs.current[refKeyToPlayerLabel].offsetTop

    if (top < anchorPlayerDrop) top = 0 // don't scroll at all
    else top -= anchorPlayerDrop

    allRefs[scrollerDivId].scrollTo({
        left: 0,
        top: top,
        behavior: 'smooth',
    }
    )
}

export default ScrollableList