---
layout: post
title: "使用VBA将多个excel文档合并成一个excel"
description: "使用VBA将多个excel文档按row和column两种方式合并成一个excel"
category: Excel
tags: [VBA, Excel]
---
{% include JB/setup %}
**在网上搜索多个excel文档合并成一个excel文档的方法， 发现找到的都是按照row来合并的，如下：**
{% highlight VbNet %}
Sub 合并当前目录下所有工作簿的全部工作表()
Dim MyPath, MyName, AWbName
Dim Wb As Workbook, WbN As String
Dim Num As Long
Dim BOX As String
Application.ScreenUpdating = False
MyPath = ActiveWorkbook.Path
MyName = Dir(MyPath & "\" & "*.xls")
AWbName = ActiveWorkbook.Name
Num = 0
Do While MyName <> ""
If MyName <> AWbName Then
Set Wb = Workbooks.Open(MyPath & "\" & MyName)
Num = Num + 1
With Workbooks(1).ActiveSheet
If Num <> 1 Then
Wb.Sheets(1).UsedRange.Offset(1, 0).Copy .Cells(.Range("A65536").End(xlUp).Row + 1, 1)
Else
Wb.Sheets(1).UsedRange.Copy .Cells(.Range("A65536").End(xlUp).Row, 1)
End If
WbN = WbN & Chr(13) & Wb.Name
Wb.Close False
End With
End If
MyName = Dir
Loop
Range("A1").Select
Application.ScreenUpdating = True
MsgBox "共合并了" & Num & "个工作薄下的全部工作表。如下：" & Chr(13) & WbN, vbInformation, "提示"
End Sub
{% endhighlight %}
**效果：**

<p><img class="img-responsive center-block" alt='datasync' src='/assets/image/posts/excel1_0.png' width="594" height="405"/></p>
<p><img class="img-responsive center-block" alt='datasync' src='/assets/image/posts/excel1_1.png' width="594" height="405"/></p>
<p><img class="img-responsive center-block" alt='datasync' src='/assets/image/posts/excel1_2.png' width="594" height="405"/></p>

**所以修改了一下，可以实现按column合并：**
{% highlight VbNet %}
Sub 合并当前目录下所有工作簿的全部工作表()
Dim MyPath, MyName, AWbName
Dim Wb As Workbook, WbN As String
Dim Num As Long
Dim BOX As String
Dim lColumn As Long
Application.ScreenUpdating = False
MyPath = ActiveWorkbook.Path
MyName = Dir(MyPath & "\" & "*.xls")
AWbName = ActiveWorkbook.Name
Num = 0
Do While MyName <> ""
If MyName <> AWbName Then
Set Wb = Workbooks.Open(MyPath & "\" & MyName)
Num = Num + 1
With Workbooks(1).ActiveSheet
lColumn = .Cells(1, Columns.Count).End(xlToLeft).Column
If Num <> 1 Then
Wb.Sheets(1).UsedRange.Offset(, 1).Copy .Cells(1, lColumn + 1)
Else
Wb.Sheets(1).UsedRange.Copy .Cells(1, lColumn)
End If
WbN = WbN & Chr(13) & Wb.Name
Wb.Close False
End With
End If
MyName = Dir
Loop
Range("B1").Select
Application.ScreenUpdating = True
MsgBox "共合并了" & Num & "个工作薄下的全部工作表。如下：" & Chr(13) & WbN, vbInformation, "提示"
End Sub
{% endhighlight %}
**效果：**
<p><img class="img-responsive center-block" alt='datasync' src='/assets/image/posts/excel2_0.png' width="594" height="405"/></p>
<p><img class="img-responsive center-block" alt='datasync' src='/assets/image/posts/excel2_1.png' width="594" height="405"/></p>
<p><img class="img-responsive center-block" alt='datasync' src='/assets/image/posts/excel2_2.png' width="594" height="405"/></p>

