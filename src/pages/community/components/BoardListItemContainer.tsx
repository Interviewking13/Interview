import styled from "styled-components";
import BoardListItem from "../../community/components/BoardListItem";

const BoardListItemContainer: React.FC = () => {
  return (
    <div>
      <StyledPostListItemBox>
        <BoardListItem />
      </StyledPostListItemBox>
    </div>
  );
};

export default BoardListItemContainer;

const StyledPostListItemBox = styled.div``;
