# Introduction

**Lorem ipsum** dolor sit amet, _consectetur_ adipiscing elit. Quisque interdum nisi ac facilisis ornare. Vivamus tristique porttitor purus sed dignissim. Sed diam augue, eleifend nec felis non, dapibus tincidunt neque. Praesent sed finibus sapien. Integer aliquam finibus enim, ut pellentesque libero tristique nec. Integer congue magna vitae lectus eleifend accumsan. Ut ante nisi, condimentum nec mauris sed, aliquam fermentum purus. Duis non est vitae mi interdum mattis. Morbi dictum nec tortor eget sagittis. Morbi sit amet lectus elit. Curabitur viverra, felis vitae pharetra sollicitudin, erat felis pretium enim, at pretium neque quam ultrices neque. Vestibulum egestas imperdiet diam. Donec id varius tellus, sit amet hendrerit velit.

---

Morbi volutpat enim sed mauris dictum, quis bibendum dui gravida. Duis eget tortor pulvinar, finibus tellus fermentum, convallis ante:

| Vestibulum | Ante | Ipsum |
| ---------- | ---- | ----- |
| Primis | In | Faucibus orci luctus et ultrices posuere cubilia curae. |
| Cras | Ullamcorper | Cursus bibendum. In dignissim est id molestie condimentum. |
| Nunc | Porta | Eros at erat porttitor, at sodales libero tincidunt. |

Vivamus ullamcorper id ligula id consectetur. Nam rhoncus, est et tristique congue, orci arcu placerat lacus, sed placerat est libero quis purus. Vivamus sit amet egestas sapien.

`int k = 3` Vivamus quis bibendum dui.

```
SpriteAnimation* EntityReader::getNextEntityStaticAnimation (
    Buffer& reader, const vec2& spriteSize
) {
    const ui32 slicesX = reader.readUInt8();
    const ui32 slicesY = reader.readUInt8();
    const ui32 frame = reader.readUInt8();

    return new StaticAnimation(uvec2(slicesX, slicesY), spriteSize, frame);
}
```

# Collaborations \{#some-id\}

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