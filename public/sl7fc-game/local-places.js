(()=>{
  if(typeof EVENT_CATALOG==='undefined'||!Array.isArray(EVENT_CATALOG))return;

  const events=[
    {id:'JED-SAF-001',icon:'🍢',title:'المرور على كانون الكباب',text:'قرر {players} المرور على كانون الكباب فرع الصفا قبل التجمع، وطال انتظار الطلب أكثر من المتوقع.',cat:'transport',min:1,severity:1},
    {id:'JED-SAF-002',icon:'🍢',title:'عزيمة كانون الكباب',text:'دعا أحد اللاعبين الفريق إلى عزيمة سريعة في كانون الكباب قبل المباراة، وبعضهم بالغ في الأكل.',cat:'lazy',min:1,severity:1},
    {id:'JED-SAF-003',icon:'📦',title:'طلب كانون الكبير',text:'تطوع {player} لاستلام طلب الفريق من كانون الكباب في الصفا، لكنه تأخر عن موعد التجمع.',cat:'transport',min:1,severity:1},
    {id:'JED-SAF-004',icon:'📸',title:'صورة عند كانون الكباب',text:'تعرّف مشجعون على {players} أثناء وجودهم عند كانون الكباب وطلبوا صورًا كثيرة قبل المباراة.',cat:'media',min:1,severity:1},

    {id:'JED-SAF-005',icon:'💈',title:'موعد في صالون كلس',text:'حجز {player} موعد حلاقة في صالون كلس قبل المباراة مباشرة، والوقت بدأ يضيق.',cat:'transport',min:1,severity:1},
    {id:'JED-SAF-006',icon:'✂️',title:'القصة الجديدة من كلس',text:'وصل {player} من صالون كلس بقصة شعر جديدة، وأصبح منشغلًا بردود فعل الفريق أكثر من الخطة.',cat:'lazy',min:1,severity:1},
    {id:'JED-SAF-007',icon:'📸',title:'تصوير في صالون كلس',text:'طلب صالون كلس تصوير مقطع قصير مع {player}، لكن التصوير طال حتى اقترب موعد المباراة.',cat:'media',min:1,severity:1},
    {id:'JED-SAF-008',icon:'⌛',title:'انتظار الدور عند كلس',text:'وجد {players} ازدحامًا عند صالون كلس، وبدأ الشك في وصولهم إلى التجمع بالوقت المناسب.',cat:'transport',min:1,severity:2},

    {id:'JED-SAF-009',icon:'🥩',title:'طلب كبيبو',text:'اتفق اللاعبون على استلام طلب مشويات من كبيبو في حي الصفا، لكن كل لاعب ظن أن الآخر سيستلمه.',cat:'conflict',min:1,severity:1},
    {id:'JED-SAF-010',icon:'🚗',title:'زحمة طريق كبيبو',text:'تأخر {players} في طريق أم القرى بعد مرورهم على كبيبو قبل التجمع.',cat:'transport',min:1,severity:1},
    {id:'JED-SAF-011',icon:'🎉',title:'مكافأة كبيبو',text:'وعد أحد الداعمين الفريق بعزيمة في كبيبو إذا تحقق الفوز القادم.',cat:'reward',min:1,severity:0},

    {id:'JED-SAF-012',icon:'🍖',title:'وقفة الكباب والكبدة البلدي',text:'أصر {player} على التوقف عند الكباب والكبدة البلدي في الصفا قبل الذهاب للمباراة.',cat:'transport',min:1,severity:1},
    {id:'JED-SAF-013',icon:'🛍️',title:'مهمة ميني ماركت الصفا',text:'اكتشف الفريق نقص الماء والمشروبات، فعاد {player} سريعًا إلى ميني ماركت الصفا لشراء الاحتياجات.',cat:'transport',min:1,severity:1},
    {id:'JED-SAF-014',icon:'🧾',title:'حساب ميني ماركت الصفا',text:'نسي {players} دفع قيمة بعض احتياجات التجمع، واضطر أحدهم للعودة وتسوية الحساب.',cat:'transport',min:1,severity:1},

    {id:'JED-BAIK-001',icon:'🍗',title:'طابور البيك',text:'دخل {players} طابور البيك قبل التجمع، ولم يتوقعوا أن الوقت سيمر بهذه السرعة.',cat:'transport',min:1,severity:1},
    {id:'JED-BAIK-002',icon:'🥡',title:'طلب البيك الناقص',text:'اكتشف {player} أنه نسي جزءًا من طلب الفريق في البيك، ويريد العودة لاستلامه قبل المباراة.',cat:'transport',min:1,severity:1},
    {id:'JED-BAIK-003',icon:'📸',title:'مشجعون عند البيك',text:'تعرّف عدد من المشجعين على لاعبي SL7 FC عند البيك، وتحول الموقف إلى جلسة تصوير طويلة.',cat:'media',min:1,severity:1},
    {id:'JED-BAIK-004',icon:'😴',title:'وجبة البيك المتأخرة',text:'أكل {players} وجبتهم في وقت متأخر من الليل، ووصلوا إلى التحضير وهم يشعرون بالخمول.',cat:'lazy',min:1,severity:1},
    {id:'JED-BAIK-005',icon:'🏆',title:'مكافأة البيك',text:'عرض أحد أعضاء الإدارة طلبًا كاملًا من البيك كمكافأة في حال الفوز بالمباراة القادمة.',cat:'reward',min:1,severity:0},

    {id:'JED-KTY-001',icon:'🍗',title:'طلب كتيكت',text:'انشغل {players} باختيار طلبهم من كتيكت وتأخروا في تأكيد الحضور للتجمع.',cat:'lazy',min:1,severity:1},
    {id:'JED-KTY-002',icon:'📱',title:'تحدي كتيكت',text:'شارك {player} في تحدٍ قصير مرتبط بكتيكت، وانتشر المقطع قبل المباراة ورفع الضغط عليه.',cat:'media',min:1,severity:1},
    {id:'JED-KTY-003',icon:'🚘',title:'استلام كتيكت',text:'ذهب {player} لاستلام طلب كتيكت بنفسه، لكنه لم يحسب وقت الطريق والعودة.',cat:'transport',min:1,severity:1},
    {id:'JED-KTY-004',icon:'🎁',title:'عزيمة كتيكت',text:'وعد الرئيس اللاعبين بعزيمة من كتيكت إذا تجاوزوا هذه المرحلة دون خسارة.',cat:'reward',min:2,severity:0},

    {id:'JED-CEN-001',icon:'🍔',title:'سنشري برجر قبل المباراة',text:'قرر {players} تناول وجبة سريعة من سنشري برجر، ثم ظهر عليهم الخمول في الاجتماع الفني.',cat:'lazy',min:1,severity:1},
    {id:'JED-CEN-002',icon:'📸',title:'تصوير في سنشري برجر',text:'انتشرت صورة لـ{players} في سنشري برجر رغم أنهم أخبروا المدرب أنهم في طريقهم للتجمع.',cat:'conflict',min:2,severity:2},
    {id:'JED-CEN-003',icon:'🎉',title:'مكافأة سنشري برجر',text:'وصل عرض لدعم الفريق بوجبة جماعية من سنشري برجر بعد الفوز القادم.',cat:'reward',min:1,severity:0},

    {id:'JED-SECB-001',icon:'🍔',title:'وقفة سكشن بي',text:'توقف {players} عند سكشن بي قبل المباراة، ثم اختلفوا على من يستلم الطلب ومن يتجه للتجمع.',cat:'conflict',min:1,severity:1},
    {id:'JED-SECB-002',icon:'🚗',title:'الطريق إلى سكشن بي',text:'أخذ {player} طريقًا أطول لاستلام الطلب من سكشن بي، وأصبح وصوله في الموعد غير مضمون.',cat:'transport',min:1,severity:1},
    {id:'JED-SECB-003',icon:'📣',title:'ظهور عند سكشن بي',text:'نشر أحد المشجعين مقطعًا للاعبين عند سكشن بي، وبدأ الجمهور يسأل عن تركيزهم قبل المباراة.',cat:'media',min:2,severity:2},

    {id:'JED-DANK-001',icon:'🥪',title:'طلب دانك ساندوتش',text:'تأخر {player} في استلام طلب الفريق من دانك ساندوتش، واضطر للتواصل مع المدرب من الطريق.',cat:'transport',min:1,severity:1},
    {id:'JED-DANK-002',icon:'📷',title:'مقطع دانك ساندوتش',text:'طلب من {players} تصوير مقطع سريع أثناء وجودهم في دانك ساندوتش، لكن المقطع أخذ وقتًا أطول.',cat:'media',min:1,severity:1},
    {id:'JED-DANK-003',icon:'🎁',title:'ساندوتشات الفوز',text:'وعد داعم الفريق بطلب من دانك ساندوتش إذا حقق SL7 FC الفوز دون استقبال أهداف.',cat:'reward',min:1,severity:0}
  ];

  const existing=new Set(EVENT_CATALOG.map(e=>e.id));
  EVENT_CATALOG.push(...events.filter(e=>!existing.has(e.id)));

  const updateLabels=()=>{
    document.querySelectorAll('.hero-features span').forEach(el=>{
      if(el.textContent.trim()==='500 حدث')el.textContent='500+ حدث';
    });
  };
  new MutationObserver(updateLabels).observe(document.getElementById('app'),{childList:true,subtree:true});
  updateLabels();
})();
