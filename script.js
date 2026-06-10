// ==================== 导航链接激活 ====================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// 页面滚动时更新导航链接
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${sectionId}`) {
                    a.classList.add('active');
                }
            });
        }
    });
});

// ==================== 过滤功能 ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const artworkCards = document.querySelectorAll('.artwork-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // 更新按钮活跃状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // 过滤作品
        artworkCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = '';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 初始化过渡效果
artworkCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ==================== 模态框功能 ====================
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

const artworkData = {
    '两个弗里达': {
        image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=600',
        description: '这是弗里达最大的画作，宽约5.7米。在这幅作品中，弗里达描绘了两个自己手牵手。一个穿着维多利亚式的洁白婚礼服装，代表她过去对迭戈的爱；另一个穿着蒂瓦纳式的传统服装，代表她当下对爱情的渴望和对迭戈背叛的痛苦。两个人物从一个共同的心脏中长出来，这象征了她复杂而痛苦的内心世界。这幅画是关于失落爱情和自我认同的深刻冥想。'
    },
    '受伤的鹿': {
        image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=600',
        description: '在这幅1937年的作品中，弗里达把自己描绘成一只被箭射中的鹿。鹿的身体被多支箭刺穿，血流不止，而头部却是弗里达悲伤的面孔。这幅画用来表现她经历多次手术和身体疼痛的痛苦。尽管身体遭受了巨大的伤害，鹿仍然睁着眼睛面对观众，象征着弗里达虽然经历痛苦但仍然坚强的精神。'
    },
    '带荆棘项链的自画像': {
        image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=600',
        description: '这幅标志性的自画像展示了弗里达穿着荆棘项链，项链上的荆棘刺破她的皮肤，鲜血流淌。她的眼睛充满泪水，表现出内心的痛楚。围绕她的是一只断翅的鸽子和一个悬在空中的剪刀，这些元素象征了失败的爱情和被遗弃的感受。这幅画创作于她与迭戈·里维拉第一次离婚之后。'
    },
    '根': {
        image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=600',
        description: '在这幅1943年的作品中，弗里达把自己描绘成一棵树。她的躯干变成了树干，树根深深扎入地下。这个意象象征了她对墨西哥土地和文化的深深联系。尽管她经历了许多痛苦和失去，她的根仍然牢牢扎根于自己的故乡。这幅画反映了弗里达对身份和归属感的思考。'
    },
    '亨利·福特医院': {
        image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=600',
        description: '这幅1932年创作的作品是弗里达最具医学意象和最令人震撼的作品之一。画面中弗里达赤裸地躺在手术床上，她的身体被解剖学式的医学器械所包围。作品描绘了她流产的经历，这对她造成了深刻的身体和心理创伤。弗里达用这幅画来表现她作为女性的痛苦和对母性的渴望。'
    },
    '边界上的自画像': {
        image: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=600',
        description: '在这幅1932年的作品中，弗里达站在墨西哥和美国的边界线上。她的身体被分为两部分，代表了她在两个国家、两个文化之间的矛盾身份。这幅画探讨了身份认同、归属感和隔离的主题。弗里达经常在美国和墨西哥之间移居，这幅作品反映了她对这种不断的迁移和分裂身份的复杂感受。'
    }
};

// 查看详情按钮
document.querySelectorAll('.btn-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.artwork-card');
        const title = card.querySelector('.artwork-info h3').textContent;
        const image = card.querySelector('.artwork-image img').src;
        
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-image').src = image;
        document.getElementById('modal-description').textContent = artworkData[title]?.description || '暂无详细介绍';
        
        modal.style.display = 'block';
    });
});

// 关闭模态框
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ==================== 平滑滚动辅助函数 ====================
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================== 页面加载动画 ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 初始化页面
window.addEventListener('DOMContentLoaded', () => {
    // 添加加载完成的类
    document.body.classList.add('loaded');
    
    // 初始化艺术卡片
    const cards = document.querySelectorAll('.artwork-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', (e) => {
    // 按 Escape 关闭模态框
    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
    
    // 按 Home 回到顶部
    if (e.key === 'Home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});