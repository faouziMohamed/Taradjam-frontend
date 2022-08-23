/**
 * @typedef {import("mongoose").Types.ObjectId} ObjectId
 * @typedef {import("mongoose").Model} Model
 */

/**
 * @typedef {{ count: number; next: number; totalData: number;data: any[];langs: {fr: string;km: string;};}} QueriedSentences
 * */

/**
 * @typedef {(limit?: number, meta?: boolean) => Promise<QueriedSentences> } RandomQueryFunc
 * @typedef {{translated:RandomQueryFunc, untranslated:RandomQueryFunc}} RandomQueriesFunction
 */

/**
 * @typedef {( skip?: number, limit?: number, meta?: boolean) => Promise<QueriedSentences> } NonRandomQueryFuncType
 * @typedef {{translated:NonRandomQueryFuncType, untranslated:NonRandomQueryFuncType}} NonRandomQueriesFunction
 * */

/**
 * @typedef {RandomQueriesFunction}
 * @typedef {NonRandomQueriesFunction}
 */

/**
 * @typedef {{langId:number, langName:string, langShortName:string}} SrcLanguage
 * @typedef {{textId:number, sentenceVo:string, srcLanguage:SrcLanguage }} SentenceData
 * @template TDataReturned
 * @typedef {{
 * currentPageSize:number,
 * totalPageCount:number,
 * currentPage:number,
 * nextPage:number,
 * totalRecordCount:number,
 * data:TDataReturned
 * }} PaginationData<TDataReturned>
 */

/**
 * @typedef {{upVote:number, downVote:number}} VotesCount
 *
 * @typedef {{
 * propositionId:string,
 * translatedText:string,
 * translationHash:string,
 * translatedBy:string,
 * translationDate:Date,
 * votes:VotesCount
 *}} Proposition
 *
 * @typedef {{ sentenceId:string, propositions:Proposition[]}} SentenceProposition
 */
