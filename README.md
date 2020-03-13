# Player

## Elems

Элемент - штука внутри которой спятана вся работа с элементов, а отдается только методы. Не должны отдавать внутренние элементы.

```js
const settingButton = createIconButton(gearIcon);

settingButton.mount(toolbarEl);
```

```js
createIconButton(gearIcon).mount(toolbarEl);
```

```js
IconButton(toolbarEl, gearIcon);
```
