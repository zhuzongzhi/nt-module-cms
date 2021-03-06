import { Column, JoinColumn, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as moment from 'moment';
import { Classify } from './classify.entity';
import { ArtInfo } from './art-info.entity';
import { Discuss } from 'src/plugin/comment/entities/discuss.entity';
@Entity('article')
export class Article {
    /*文章Id*/
    @PrimaryGeneratedColumn()
    id: number;

    /* 作者id*/
    @Column({
        comment: '作者id',
        nullable: true
    })
    userId: number;

    /*文章标题*/
    @Column({
        nullable: true,
        length: 120,
    })
    title: string;

    /*关键词*/
    @Column({
        nullable: true
    })
    keywords: string;

    @Column({
        default:0
    })
    like: number;

    /* 访问量*/
    @Column({
        default: 0
    })
    views: number;

    /*封面图片地址*/
    @Column({
        nullable: true,
        length: 500,
    })
    cover: string;


    /*摘要*/
    @Column({
        nullable: true,
        length: 500,
    })
    abstract: string;

    /*内容*/
    @Column({
        nullable: true,
        type: 'text',
    })
    content: string;

    /*置顶*/
    @Column({
        default: false
    })
    top: boolean;

    /*来源*/
    @Column({
        nullable: true,
        length: 120,
    })
    source: string;

    /*文章状态, 0 待审核 1 审核通过 2  被拒绝  */
    @Column({
        default: 0
    })
    status: number;

    /*拒绝原因*/
    @Column({
        type: 'text',
        nullable: true
    })
    refuseReason: string;

    /*来源链接*/
    @Column({
        nullable: true,
        length: 200,
    })
    sourceUrl: string;

    /*删除(回收站)*/
    @Column({
        nullable: true,
        default: false
    })
    recycling: boolean;

    /*发布时间*/
    @Column({
        nullable: true,
        default: () => 'NOW ()',
        transformer: {
            from: (date) => {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            },
            to: (date) => {
                date = date ? date : new Date();
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    })
    createdAt: string;

    /*修改时间*/
    @Column({
        nullable: true,
        default: () => 'NOW ()',
        transformer: {
            from: (date) => {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            },
            to: (date) => {
                date = date ? date : new Date();
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    })
    modifyAt: string;

    /*分类Id*/
    @ManyToOne(type => Classify, classify => classify.articles, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn({
        name: 'classifyId',
        referencedColumnName: 'id'
    })
    classify: Classify;

    @OneToMany(type => ArtInfo, artInfo => artInfo.article)
    artInfos: ArtInfo[];

    @OneToMany(type=>Discuss,discuss=>discuss.article)
    discuss: Discuss[];

}

