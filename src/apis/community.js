const { Community, CommunityReply } = require('../models');

const communityApi = {

    /** 전체목록조회 */
    async getAllList(req, res) {

        try {
            // TODO: 권장사항 => GET => query
            const findContent = await Community.find({ });
            // console.log('getAllList findContent: ', findContent);
      
            if (!findContent) {
                return res.status(400).json({ message: "목록조회 실패" });
            } 

            res.status(200).json({
                message: "목록조회 성공",
                data: findContent,
            });
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
    },

    /** 게시글등록 */
    async postContent(req, res) {
    
        try {
            const { author, title, content, attach } = req.body;

            /** 게시글번호 순차부여 */
            async function getLastCommunityNo() {

                const lastCommunity = await Community.findOne().sort({ community_no: -1 }).limit(1).exec();
                if (lastCommunity) {
                  return lastCommunity.community_no;
                }
                return 1;
            };  

            /** 게시글번호 생성 */
            const lastCommunityNo = await getLastCommunityNo();
            const newCommunityNo = lastCommunityNo + 1;
    
            const newContent = await Community.create({
                community_no: newCommunityNo,
                author,
                title,
                content,
                attach,
            });
    
            if (!newContent) {
                return res.status(400).json({ message: "게시글생성 실패" });
            } 

            // console.log('newContent: ', newContent);
            res.status(200).json({ 
                message: "게시글등록 성공",
                data: newContent,
            });
        } catch (err) {
            throw new Error(err);
        }
    },

    /** 게시글조회 */
    async getContent(req, res) {

        try {

            const reqContent = req.query.community_no;
            // console.log('reqContent: ', reqContent);

            const findContent = await Community.findOne({ community_no: reqContent });
            const findReply = await CommunityReply.findOne({ community_no: reqContent });
            // console.log('getContent findReply: ', findReply);

            if (!findContent) {
                return res.status(400).json({ message: "게시글조회 실패" });
            }

            res.status(200).json({
                message: "게시글조회 성공",
                data: { findContent, findReply } 
            });
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
    },

    /** 게시글수정 */
    async modifyContent(req, res) {
        try {

            const { community_no, title, content, attach } = req.body;
            const findContent = await Community.findOne({ community_no });
            const findNo = findContent.community_no;
            // console.log('findNo: ', findNo);
            // console.log('findContent: ', findContent);

            if(!findContent) {
                return res.status(400).json({ message: "게시글찾기 실패" });
            }

            
            const updateContent = await Community.findOneAndUpdate({ community_no: findNo }, {
                title,
                content,
                attach,
            }, { new: true });
            // console.log('updateContent: ', updateContent);

            // const updateContent = new Community({ community_no: findNo });
            // const newContent = await updateContent.save();
            // console.log("newContent: ", newContent);
            
            if (!updateContent){
                return res.status(400).json({ message: "게시글수정 실패" });
            }

            // console.log('updateContent: ', updateContent);
            res.status(200).json({
                message: "게시글수정 성공",
                data: updateContent,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    /** 게시글삭제 */
    async deleteContent(req, res) {

        try {

            const reqNo = req.query.community_no;
            const findContent = await Community.findOne({ community_no: reqNo });
    
            if (!findContent) {
                return res.status(400).json({ message: "게시글삭제 실패" });
            }

            const deleteContent = await Community.deleteOne({ community_no: reqNo });
            // console.log('deleteContent: ', deleteContent);
            
            res.status(200).json({
                message: "게시글삭제 성공",
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    /** 댓글등록 */
    async postReply(req, res) {

        try {
            const { reply_author, reply_content, community_no } = req.body;

            /** 댓글번호 순차부여 */
            async function getLastCommunityNo() {

                const lastCommunity = await CommunityReply.findOne().sort({ reply_no: -1 }).limit(1).exec();
                if (lastCommunity) return lastCommunity.reply_no;
                return 1;
            };  

            /** 댓글번호 생성 */
            const lastCommunityNo = await getLastCommunityNo();
            const newCommunityNo = lastCommunityNo + 1;

            // const findContent = await Community.findOne({ community_no });
    
            const newContent = await CommunityReply.create({
                reply_no: newCommunityNo,
                reply_author,
                reply_content,
                community_no,
            });
    
            if(!newContent) {
                return res.status(400).json({ message: "댓글등록 실패" });
            }

            res.status(200).json({ 
                message: "댓글등록 성공",
                data: newContent,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },      

    /** 댓글수정 */
    async modifyReply(req, res) {
        try {

            const { reply_no, reply_content, community_no } = req.body;
            const findContent = await CommunityReply.findOne({ reply_no });
            const findNo = findContent.reply_no;
            // console.log('findNo: ', findNo);

            if (!findContent) {
                return res.status(400).json({ message: "댓글수정 실패" });
            }

            const updateContent = await CommunityReply.findOneAndUpdate({ reply_no: findNo }, {
                reply_content,
            }, { new: true });
                
            res.status(200).json({
                message: "댓글수정 성공",
                data: updateContent,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },  

    /** 댓글삭제 */
    async deleteReply(req, res) {
        try {

            const reqNo = req.body.reply_no;
            const findContent = await CommunityReply.findOne({ reply_no: reqNo });
    
            if (!findContent) {
                return res.status(400).json({ message: "댓글삭제 실패" });
            }

            const deleteContent = await CommunityReply.deleteOne({ reply_no: reqNo });
            console.log('deleteContent: ', deleteContent);
                
            res.status(200).json({
                message: "댓글삭제 성공"
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
}

module.exports = communityApi;