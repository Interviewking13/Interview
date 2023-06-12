const { Community, CommunityReply, User } = require('../models');

const communityApi = {

    /** 전체목록조회 */
    async getAllList(req, res) {

        try {
            const findContent = await Community.find({ });
            
            if (!findContent) {
                return res.status(400).json({ message: "목록조회 실패" });
            } 

            return res.status(200).json({
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
            const { user_id, title, content } = req.body;
            const findUser = await User.findOne({ _id: user_id })
                .populate("user_id", "user_name")
            const user_name = findUser.user_name;

            const file_etag = req.file_etag;
            const file_name = req.file_name;
            const file_key = req.file_key;

            /** 게시글번호 순차부여 */
            async function getLastCommunityId() {

                const lastCommunity = await Community.findOne().sort({ community_id: -1 }).limit(1).exec();
                if (lastCommunity) {
                  return lastCommunity.community_id;
                }
                return 1;
            };  

            /** 게시글번호 생성 */
            const lastCommunityId = await getLastCommunityId();
            const newCommunityId = lastCommunityId + 1;
    
            const newContent = await Community.create({
                community_id: newCommunityId,
                user_id,
                user_name,
                title,
                content,
                file_key,
                file_etag,
                file_name,
            });

            if (!newContent) {
                return res.status(400).json({ message: "게시글생성 실패" });
            } 

            return res.status(200).json({ 
                message: "게시글등록 성공",
                data: newContent,
            });
        } catch (err) {
            throw new Error(err);
        }
    },

    /** 게시글조회(개별) : 게시글+댓글+첨부파일 */
    async getContent(req, res) {
        try {

            const { community_id, user_id } = req.query;
            const findContent = await Community.find({ community_id });
            const findReply = await CommunityReply.find({ community_id });

            if (!findContent) {
                return res.status(400).json({ message: "게시글조회 실패" });
	    } 

            /** read_users 배열에 게시글을 조회한 user_id 추가 */
            const updateContent = await Community.findOneAndUpdate(
                { community_id },
                { $addToSet: { read_users: user_id } },
                { new: true }
            );

            return res.status(200).json({
                message: "게시글조회 성공",
                data: { updateContent, findReply }
            });
            
        } catch (err) {
        console.log(err);
        throw new Error(err);
        }
    },

    /** 첨부파일 다운로드 */
    async fileDownload(req, res) {
        try {

            const fileStream = req.fileStream;        
            const findContent = await Community.find({ community_id: req.query.community_id });

            if (!findContent) {
                return res.status(400).json({ message: "파일 다운로드 실패" });
            }
        
            /** 클라이언트에게 다운로드 파일 전달 */
            if (fileStream) {
                res.set('Content-Type', fileStream.contentType);
                res.set('Content-Disposition', fileStream.contentDisposition);
                fileStream.fileStream.pipe(res);

                return res.status(200).json({
                    message: "파일 다운로드 성공"
                });
            }
        } catch (err) {
        console.log(err);
        throw new Error(err);
        }
    },

    /** 게시글수정 */
    async modifyContent(req, res) {
        try {
            const { community_id, title, content } = req.body;
            const findContent = await Community.findOne({ community_id });

            const file_etag = req.file_etag;
            const file_name = req.file_name;
            const file_key = req.file_key;
            const userTokenValidate = req.user;
            // const { user_id } = req.user;

            console.log('userTokenValidate: ', userTokenValidate);

            if(!findContent) {
                return res.status(400).json({ message: "게시글찾기 실패" });
            }

            const updateContent = await Community.findOneAndUpdate({ community_id }, {
                title,
                content,
                file_key,
                file_etag,
                file_name,
            }, { new: true });
            
            if (!updateContent){
                return res.status(400).json({ message: "게시글수정 실패" });
            }

            return res.status(200).json({
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
            const findContent = await Community.findOne({ community_id: req.query.community_id });
    
            if (!findContent) {
                return res.status(400).json({ message: "게시글삭제 실패" });
            }

            const deleteContent = await Community.deleteOne({ community_id: req.query.community_id });
            
            return res.status(200).json({
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
            const { reply_user_id, reply_content, community_id } = req.body;
            const findUser = await User.findOne({ _id: reply_user_id })
            .populate("user_id", "user_name")
            const reply_user_name = findUser.user_name;
            
            /** 댓글번호 순차부여 */
            async function getLastCommunityId() {

                const lastCommunity = await CommunityReply.findOne().sort({ reply_id: -1 }).limit(1).exec();
                if (lastCommunity) return lastCommunity.reply_id;
                return 1;
            };  

            /** 댓글번호 생성 */
            const lastCommunityId = await getLastCommunityId();
            const newCommunityId = lastCommunityId + 1;
    
            const newContent = await CommunityReply.create({
                reply_id: newCommunityId,
                reply_user_id,
                reply_user_name,
                reply_content,
                community_id,
            });
    
            if(!newContent) {
                return res.status(400).json({ message: "댓글등록 실패" });
            }

            return res.status(200).json({ 
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

            const { reply_id, reply_content } = req.body;
            const findReply = await CommunityReply.findOne({ reply_id });

            if (!findReply) {
                return res.status(400).json({ message: "댓글수정 실패" });
            }

            const updateContent = await CommunityReply.findOneAndUpdate({ reply_id: findReply.reply_id }, {
                reply_content,
            }, { new: true });
                
            return res.status(200).json({
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
            const findReply = await CommunityReply.findOne({ reply_id: req.query.reply_id });
    
            if (!findReply) {
                return res.status(400).json({ message: "댓글삭제 실패" });
            }

            const deleteContent = await CommunityReply.deleteOne({ reply_id: req.query.reply_id });
                
            return res.status(200).json({
                message: "댓글삭제 성공"
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
}

module.exports = communityApi;
