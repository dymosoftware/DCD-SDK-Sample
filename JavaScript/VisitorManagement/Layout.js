function getLayout0() {
    var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
                    <DieCutLabel Version="8.0" Units="twips">\
	                    <PaperOrientation>Landscape</PaperOrientation>\
	                    <Id>NameBadgeTag</Id>\
	                    <PaperName>30252 Address</PaperName>\
	                    <DrawCommands>\
		                    <Path>\
			                    <FillMode>EvenOdd</FillMode>\
			                    <Line X1="3240" Y1="0" X2="3240" Y2="5040" />\
			                    <LineTo X="270" Y="5040" />\
			                    <Arc CenterX="185" CenterY="5040" Radius="85" StartAngle="0" EndAngle="90" />\
			                    <LineTo X="0" Y="4955" />\
			                    <LineTo X="0" Y="85" />\
			                    <LineTo X="185" Y="85" />\
			                    <Arc CenterX="185" CenterY="0" Radius="85" StartAngle="-90" EndAngle="0" />\
			                    <LineTo X="3240" Y="0" />\
		                    </Path>\
	                    </DrawCommands>\
	                    <ObjectInfo>\
		                    <ShapeObject>\
			                    <Name>Shape</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>False</IsVariable>\
			                    <ShapeType>HorizontalLine</ShapeType>\
			                    <LineWidth>45</LineWidth>\
			                    <LineAlignment>Center</LineAlignment>\
			                    <FillColor Alpha="0" Red="255" Green="255" Blue="255" />\
		                    </ShapeObject>\
		                    <Bounds X="468" Y="1425" Width="4471.2001953125" Height="45" />\
	                    </ObjectInfo>\
	                    <ObjectInfo>\
		                    <TextObject>\
			                    <Name>Top Text</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>False</IsVariable>\
			                    <HorizontalAlignment>Center</HorizontalAlignment>\
			                    <VerticalAlignment>Middle</VerticalAlignment>\
			                    <TextFitMode>ShrinkToFit</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
				                    <Element>\
					                    <String>VISITOR</String>\
					                    <Attributes>\
						                    <Font Family="Arial" Size="28" Bold="True" Italic="False" Underline="False" Strikeout="False" />\
						                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
					                    </Attributes>\
				                    </Element>\
			                    </StyledText>\
		                    </TextObject>\
		                    <Bounds X="468" Y="600" Width="4471.2001953125" Height="720" />\
	                    </ObjectInfo>\
	                    <ObjectInfo>\
		                    <TextObject>\
			                    <Name>text</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>True</IsVariable>\
			                    <HorizontalAlignment>Right</HorizontalAlignment>\
			                    <VerticalAlignment>Middle</VerticalAlignment>\
			                    <TextFitMode>ShrinkToFit</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
				                    <Element>\
					                    <String>Name\
                        and other information</String>\
                                            <Attributes>\
                                                <Font Family="Arial" Size="18" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                            </Attributes>\
                                        </Element>\
                                    </StyledText>\
                                </TextObject>\
                                <Bounds X="179.11901855469" Y="1010.44702148438" Width="3360.0810546875" Height="1495.95300292969" />\
                            </ObjectInfo>\
                            <ObjectInfo>\
                                <ImageObject>\
                                    <Name>photo</Name>\
                                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                    <BackColor Alpha="0" Red="0" Green="0" Blue="0" />\
                                    <LinkedObjectName></LinkedObjectName>\
                                    <Rotation>Rotation0</Rotation>\
                                    <IsMirrored>False</IsMirrored>\
                                    <IsVariable>False</IsVariable>\
                                    <Image>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</Image>\
                                    <ScaleMode>Uniform</ScaleMode>\
                                    <BorderWidth>0</BorderWidth>\
                                    <BorderColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                    <HorizontalAlignment>Center</HorizontalAlignment>\
                                    <VerticalAlignment>Center</VerticalAlignment>\
                                </ImageObject>\
                                <Bounds X="468" Y="776.22299194336" Width="907.56640625" Height="1199.17700195313" />\
                            </ObjectInfo>\
                        </DieCutLabel>';
    return labelXml;
}
function getLayout1() {
    var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
                    <DieCutLabel Version="8.0" Units="twips">\
                      <PaperOrientation>Landscape</PaperOrientation>\
                      <Id>NameBadgeTag</Id>\
                      <PaperName>30252 Address</PaperName>\
                      <DrawCommands>\
                        <Path>\
                          <FillMode>EvenOdd</FillMode>\
                          <Line X1="3240" Y1="0" X2="3240" Y2="5040"/>\
                          <LineTo X="270" Y="5040"/>\
                          <Arc CenterX="185" CenterY="5040" Radius="85" StartAngle="0" EndAngle="90"/>\
                          <LineTo X="0" Y="4955"/>\
                          <LineTo X="0" Y="85"/>\
                          <LineTo X="185" Y="85"/>\
                          <Arc CenterX="185" CenterY="0" Radius="85" StartAngle="-90" EndAngle="0"/>\
                          <LineTo X="3240" Y="0"/>\
                        </Path>\
                      </DrawCommands>\
                      <ObjectInfo>\
                        <TextObject>\
                          <Name>text</Name>\
                          <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
                          <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
                          <LinkedObjectName></LinkedObjectName>\
                          <Rotation>Rotation0</Rotation>\
                          <IsMirrored>False</IsMirrored>\
                          <IsVariable>True</IsVariable>\
                          <HorizontalAlignment>Left</HorizontalAlignment>\
                          <VerticalAlignment>Top</VerticalAlignment>\
                          <TextFitMode>ShrinkToFit</TextFitMode>\
                          <UseFullFontHeight>True</UseFullFontHeight>\
                          <Verticalized>False</Verticalized>\
                          <StyledText>\
                            <Element>\
                              <String>Name and other information</String>\
                              <Attributes>\
                                <Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
                              </Attributes>\
                            </Element>\
                          </StyledText>\
                        </TextObject>\
                        <Bounds X="468" Y="413.943" Width="4471.2" Height="1706.457"/>\
                      </ObjectInfo>\
                      <ObjectInfo>\
                        <ShapeObject>\
                          <Name>Shape</Name>\
                          <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
                          <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
                          <LinkedObjectName></LinkedObjectName>\
                          <Rotation>Rotation0</Rotation>\
                          <IsMirrored>False</IsMirrored>\
                          <IsVariable>False</IsVariable>\
                          <ShapeType>HorizontalLine</ShapeType>\
                          <LineWidth>15</LineWidth>\
                          <LineAlignment>Center</LineAlignment>\
                          <FillColor Alpha="0" Red="255" Green="255" Blue="255"/>\
                        </ShapeObject>\
                        <Bounds X="468" Y="1108.6" Width="4471.2" Height="15"/>\
                      </ObjectInfo>\
                      <ObjectInfo>\
                        <TextObject>\
                          <Name>Top Text</Name>\
                          <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
                          <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
                          <LinkedObjectName></LinkedObjectName>\
                          <Rotation>Rotation0</Rotation>\
                          <IsMirrored>False</IsMirrored>\
                          <IsVariable>False</IsVariable>\
                          <HorizontalAlignment>Left</HorizontalAlignment>\
                          <VerticalAlignment>Middle</VerticalAlignment>\
                          <TextFitMode>ShrinkToFit</TextFitMode>\
                          <UseFullFontHeight>True</UseFullFontHeight>\
                          <Verticalized>False</Verticalized>\
                          <StyledText>\
                            <Element>\
                              <String>VISITOR</String>\
                              <Attributes>\
                                <Font Family="Arial" Size="28" Bold="True" Italic="False" Underline="False" Strikeout="False"/>\
                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
                              </Attributes>\
                            </Element>\
                          </StyledText>\
                        </TextObject>\
                        <Bounds X="468" Y="301.1811" Width="4471.2" Height="833.3859"/>\
                      </ObjectInfo>\
                    </DieCutLabel>';
    return labelXml;
}
function getLayout2() {
    var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
                    <DieCutLabel Version="8.0" Units="twips">\
	                    <PaperOrientation>Landscape</PaperOrientation>\
	                    <Id>NameBadge</Id>\
	                    <PaperName>30256 Shipping</PaperName>\
	                    <DrawCommands>\
		                    <Path>\
			                    <FillMode>EvenOdd</FillMode>\
			                    <RoundRectangle X="0" Y="0" Width="3331" Height="5760" Rx="180" Ry="180" />\
			                    <RoundRectangle X="2880" Y="2520" Width="180" Height="720" Rx="120" Ry="120" />\
		                    </Path>\
	                    </DrawCommands>\
	                    <ObjectInfo>\
		                    <TextObject>\
			                    <Name>Top Text</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>False</IsVariable>\
			                    <HorizontalAlignment>Center</HorizontalAlignment>\
			                    <VerticalAlignment>Middle</VerticalAlignment>\
			                    <TextFitMode>ShrinkToFit</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
				                    <Element>\
					                    <String>VISITOR</String>\
					                    <Attributes>\
						                    <Font Family="Arial" Size="48" Bold="True" Italic="False" Underline="False" Strikeout="False" />\
						                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
					                    </Attributes>\
				                    </Element>\
			                    </StyledText>\
		                    </TextObject>\
		                    <Bounds X="336" Y="497.256622314453" Width="5338" Height="822.743347167969" />\
	                    </ObjectInfo>\
	                    <ObjectInfo>\
		                    <ShapeObject>\
			                    <Name>Shape</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>False</IsVariable>\
			                    <ShapeType>HorizontalLine</ShapeType>\
			                    <LineWidth>45</LineWidth>\
			                    <LineAlignment>Center</LineAlignment>\
			                    <FillColor Alpha="0" Red="255" Green="255" Blue="255" />\
		                    </ShapeObject>\
		                    <Bounds X="336" Y="1425" Width="5338" Height="45" />\
	                    </ObjectInfo>\
	                    <ObjectInfo>\
		                    <TextObject>\
			                    <Name>text</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>True</IsVariable>\
			                    <HorizontalAlignment>Right</HorizontalAlignment>\
			                    <VerticalAlignment>Middle</VerticalAlignment>\
			                    <TextFitMode>ShrinkToFit</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
				                    <Element>\
					                    <String>Click here\
                        to enter name\
                        and other information</String>\
                                            <Attributes>\
                                                <Font Family="Arial" Size="18" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                            </Attributes>\
                                        </Element>\
                                    </StyledText>\
                                </TextObject>\
                                <Bounds X="1918.60009765625" Y="1518" Width="3755.39990234375" Height="1731" />\
                            </ObjectInfo>\
                            <ObjectInfo>\
                                <ImageObject>\
                                    <Name>photo</Name>\
                                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
                                    <LinkedObjectName></LinkedObjectName>\
                                    <Rotation>Rotation0</Rotation>\
                                    <IsMirrored>False</IsMirrored>\
                                    <IsVariable>False</IsVariable>\
                                    <Image>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</Image>\
                                    <ScaleMode>Uniform</ScaleMode>\
                                    <BorderWidth>0</BorderWidth>\
                                    <BorderColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                    <HorizontalAlignment>Center</HorizontalAlignment>\
                                    <VerticalAlignment>Center</VerticalAlignment>\
                                </ImageObject>\
                                <Bounds X="336" Y="1692.9" Width="862.736842105263" Height="1350" />\
                            </ObjectInfo>\
                        </DieCutLabel>';
    return labelXml;
}
function getLayout3() {
    var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
                    <DieCutLabel Version="8.0" Units="twips">\
	                    <PaperOrientation>Landscape</PaperOrientation>\
	                    <Id>NameBadge</Id>\
	                    <PaperName>30256 Shipping</PaperName>\
	                    <DrawCommands>\
		                    <Path>\
			                    <FillMode>EvenOdd</FillMode>\
			                    <RoundRectangle X="0" Y="0" Width="3331" Height="5760" Rx="180" Ry="180" />\
			                    <RoundRectangle X="2880" Y="2520" Width="180" Height="720" Rx="120" Ry="120" />\
		                    </Path>\
	                    </DrawCommands>\
	                    <ObjectInfo>\
		                    <TextObject>\
			                    <Name>Top Text</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>False</IsVariable>\
			                    <HorizontalAlignment>Center</HorizontalAlignment>\
			                    <VerticalAlignment>Middle</VerticalAlignment>\
			                    <TextFitMode>ShrinkToFit</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
				                    <Element>\
					                    <String>VISITOR</String>\
					                    <Attributes>\
						                    <Font Family="Arial" Size="48" Bold="True" Italic="False" Underline="False" Strikeout="False" />\
						                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
					                    </Attributes>\
				                    </Element>\
			                    </StyledText>\
		                    </TextObject>\
		                    <Bounds X="336" Y="497.256622314453" Width="5338" Height="822.743347167969" />\
	                    </ObjectInfo>\
	                    <ObjectInfo>\
		                    <ShapeObject>\
			                    <Name>Shape</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>False</IsVariable>\
			                    <ShapeType>HorizontalLine</ShapeType>\
			                    <LineWidth>45</LineWidth>\
			                    <LineAlignment>Center</LineAlignment>\
			                    <FillColor Alpha="0" Red="255" Green="255" Blue="255" />\
		                    </ShapeObject>\
		                    <Bounds X="336" Y="1425" Width="5338" Height="45" />\
	                    </ObjectInfo>\
	                    <ObjectInfo>\
		                    <TextObject>\
			                    <Name>text</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>True</IsVariable>\
			                    <HorizontalAlignment>Right</HorizontalAlignment>\
			                    <VerticalAlignment>Middle</VerticalAlignment>\
			                    <TextFitMode>ShrinkToFit</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
				                    <Element>\
					                    <String>Click here\
                        to enter name\
                        and other information</String>\
                                            <Attributes>\
                                                <Font Family="Arial" Size="18" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
                                                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                                            </Attributes>\
                                        </Element>\
                                    </StyledText>\
                                </TextObject>\
                                <Bounds X="1918.60009765625" Y="1518" Width="3755.39990234375" Height="1731" />\
                            </ObjectInfo>\
                        </DieCutLabel>';
    return labelXml;
}