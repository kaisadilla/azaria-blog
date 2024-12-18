---
title: "[TEST] Testing MDX for the blog"
category: "opinion"
created: 2022-03-17
thumbnail: test-code.jpg
summary: Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Quisque interdum nisi ac facilisis ornare. Vivamus tristique porttitor purus sed dignissim. Sed diam augue, eleifend nec felis non, dapibus tincidunt neque. Praesent sed finibus sapien. Integer aliquam finibus enim, ut pellentesque libero tristique nec. Integer congue magna vitae lectus eleifend accumsan. Ut ante nisi, condimentum nec mauris sed, aliquam fermentum purus. Duis non est vitae mi interdum mattis. Morbi dictum nec tortor eget sagittis. Morbi sit amet lectus elit. Curabitur viverra, felis vitae pharetra sollicitudin, erat felis pretium enim, at pretium neque quam ultrices neque. Vestibulum egestas imperdiet diam. Donec id varius tellus, sit amet hendrerit velit.
---
# Introduction

**Lorem ipsum** dolor sit amet, _consectetur_ adipiscing elit. Quisque interdum nisi ac facilisis ornare. Vivamus tristique porttitor purus sed dignissim. Sed diam augue, eleifend nec felis non, dapibus tincidunt neque. _Praesent sed finibus sapien. Integer aliquam finibus enim, ut pellentesque libero tristique nec. Integer congue magna vitae lectus eleifend accumsan. Ut ante nisi, condimentum nec mauris sed, aliquam fermentum purus. Duis non est vitae mi interdum mattis._ Morbi dictum nec tortor eget sagittis. Morbi sit amet lectus elit. Curabitur viverra, felis vitae pharetra sollicitudin, erat felis pretium enim, at pretium neque quam ultrices neque. **Vestibulum egestas imperdiet diam. Donec id varius tellus, sit amet hendrerit velit.**

---

Morbi volutpat enim sed mauris dictum, quis bibendum dui gravida. Duis eget tortor pulvinar, finibus tellus fermentum, convallis ante:

| Vestibulum | Ante | Ipsum |
| ---------- | ---- | ----- |
| Primis | In | Faucibus orci luctus et ultrices posuere cubilia curae. |
| Cras | Ullamcorper | Cursus bibendum. In dignissim est id molestie condimentum. |
| Nunc | Porta | Eros at erat porttitor, at sodales libero tincidunt. |

Vivamus ullamcorper id ligula id consectetur. Nam rhoncus, est et tristique congue, orci arcu placerat lacus, sed placerat est libero quis `js const i = 3` purus. Vivamus sit amet egestas sapien Vivamus quis bibendum dui.

```c++ filename="example.cpp"
SpriteAnimation* EntityReader::getNextEntityStaticAnimation (
    Buffer& reader, const vec2& spriteSize
) {
    const ui32 slicesX = reader.readUInt8();
    const ui32 slicesY = reader.readUInt8();
    const ui32 frame = reader.readUInt8();

    const string veryLongStringToOverflowCodeBox = "This is a very long string that will make the code box this snippet is shown in overflow.";

    return new StaticAnimation(uvec2(slicesX, slicesY), spriteSize, frame);
}
```

# Collaborations

Sed ut ornare nisl, eu posuere nibh. Sed bibendum eget lacus et maximus. Suspendisse in ullamcorper felis. [^1] Integer finibus turpis sit amet massa pharetra malesuada. Mauris dapibus, sem at efficitur pellentesque, tellus risus egestas quam, scelerisque ornare sapien odio nec nulla.

Proin
: vel ultricies lectus, sit amet fermentum odio.

~~Duis sed egestas metus, vitae commodo ex. Donec congue dignissim nulla rhoncus tristique. Sed pulvinar nec magna aliquet aliquet.~~

H~2~O
x^2 :joy:

[^1]: Proin accumsan orci risus, in posuere orci vulputate vitae.

# Images
![Some image](img/window_frame_top_right.png)
<Clock />
<InlineCode language="c++" code="const int counter = 5" />

# Very long

Curabitur neque tortor, laoreet nec lectus ut, malesuada gravida nibh. Mauris ac aliquam nunc, vestibulum pharetra justo. Sed diam eros, imperdiet at fringilla et, fringilla et diam. Duis faucibus dictum arcu. Vivamus luctus enim semper enim placerat, et auctor tellus eleifend. Sed euismod justo tellus, a gravida nisl mollis eu. Etiam quam lectus, rutrum eu sodales ac, venenatis ac felis. Etiam elementum ipsum at ultrices auctor. Curabitur quis viverra tellus. Nunc nunc neque, consequat non ultricies vel, interdum at leo. Nulla et finibus turpis, eu malesuada urna. Aliquam lobortis viverra sem, non pulvinar lorem finibus quis. Pellentesque ut augue ex. Phasellus tincidunt vel sapien vitae placerat.

Pellentesque congue, lorem ac lacinia sodales, velit neque elementum augue, id congue risus nunc sed justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse imperdiet lacus ac pellentesque rutrum. Sed volutpat nec velit ut lacinia. Phasellus lacinia metus ante. Nunc egestas augue vel ante hendrerit mattis. Integer lacinia, eros dictum lobortis aliquet, purus leo gravida augue, vitae aliquam nisl justo eget mauris.

Phasellus in pretium velit. Nulla nec dictum lectus. Duis et pharetra arcu. Etiam ullamcorper laoreet nunc quis sollicitudin. Morbi accumsan mi vel dapibus posuere. In blandit mattis gravida. Ut sollicitudin mauris in lacinia facilisis. Proin a dapibus risus. Quisque ac metus id tellus bibendum tincidunt. Curabitur bibendum tortor arcu, ut varius dui lacinia ut. Nunc eleifend tortor arcu, vitae cursus elit imperdiet gravida. Sed laoreet odio non urna porta tempus. Nullam hendrerit tempor urna, in aliquet quam lobortis at. Vivamus vitae aliquam odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Suspendisse blandit sed risus et venenatis. Nullam sollicitudin commodo ornare. Morbi sed leo interdum, ultrices est eu, porttitor ex. Donec pulvinar mauris a consequat efficitur. Nunc imperdiet interdum molestie. Fusce ullamcorper hendrerit nisi, ac semper ligula malesuada nec. Nam convallis interdum dolor, vel posuere risus tincidunt in. Pellentesque sit amet enim neque. Suspendisse odio turpis, finibus vitae mi ut, eleifend semper velit. Morbi quis vestibulum justo, vitae luctus tortor. Maecenas placerat, felis id vehicula lobortis, lacus est pulvinar ex, ut ultrices justo neque vitae turpis. Donec vitae orci ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 